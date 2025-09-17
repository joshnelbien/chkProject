import Footer from "../../Footer/Footer"
import NavigationBar from "../../NavigationBar/NavigationBar"
function AboutPage() {
  return (
     <div className="flex flex-col min-h-screen">
         {/* Navbar at the top */}
         <NavigationBar />
   
         {/* Page content (fills available space) */}
         <main className="flex-grow pt-16">
           About Page
         </main>
   
         {/* Footer always at bottom */}
         <Footer />
       </div>
  )
}

export default AboutPage