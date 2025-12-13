const express = require("express");
const router = express.Router();
const multer = require("multer");
const Staffs = require("../db/model/staffsDB");

// Multer → store as Buffer (for BLOB)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ============== ADD STAFF ================= //
router.post("/staff", upload.single("image"), async (req, res) => {
    try {
        const { firstName, lastName, position, description, headings } = req.body;

        const newStaff = await Staffs.create({
            firstName,
            lastName,
            position,
            headings,
            description,
            headings,
            image: req.file ? req.file.buffer : null, // <== BLOB stored here
        });

        return res.status(201).json({
            message: "Staff added successfully",
            data: newStaff,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to add staff" });
    }
});

// ============== GET ALL STAFF ============= //
router.get("/staff", async (req, res) => {
    try {
        const staff = await Staffs.findAll();

        const formatted = staff.map(s => ({
            id: s.id,
            firstName: s.firstName,
            lastName: s.lastName,
            position: s.position,
            description: s.description,
            imageURL: s.image ? `data:image/jpeg;base64,${s.image.toString("base64")}` : null // <-- Convert BLOB to Base64
        }));

        res.json(formatted);

    } catch (err) {
        res.status(500).json({ message: "Cannot fetch staff." });
    }
});

router.delete("/staff/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find staff by ID
        const staff = await Staffs.findByPk(id);
        if (!staff) return res.status(404).json({ message: "Staff not found" });

        await staff.destroy(); // Delete record
        return res.json({ message: "Staff deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to delete staff" });
    }
});

// ============== UPDATE STAFF ============= //
router.put("/staff/:id", upload.single("image"), async (req, res) => {
  try {
    const { firstName, lastName, position, description } = req.body;
    const staffId = req.params.id;

    // Find the staff
    const staff = await Staffs.findByPk(staffId);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    // Update fields
    staff.firstName = firstName || staff.firstName;
    staff.lastName = lastName || staff.lastName;
    staff.position = position || staff.position;
    staff.description = description || staff.description;
    if (req.file) staff.image = req.file.buffer; // optional update image

    await staff.save();

    return res.json({ message: "Staff updated successfully", data: staff });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to update staff" });
  }
});

module.exports = router;
