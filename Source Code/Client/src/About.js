import React, { Component } from "react";
import './About.css';
import about_image from "./about.jpg";
class About extends Component {
  render() {
    return (
      <body id = "bgimage">
      <div id="bckimg" style={{ backgroundImage: `url(${about_image})`, backgroundSize: 'auto',backgroundPosition: 'center',height:700}}>

      <div id = "about" style={{textDecorationStyle:'bold'}}>
      <br></br> <br></br><br></br><br></br>
       
      </div>
      </div>
      <div class="text-block">
      <h3 id = "text-about"><font color ="#FBF9F9"><bold><center>WE CARE</center></bold></font></h3>
      <br></br>
        
        <p> <center><font color ="#FBF9F9">A database management system for spreading awareness and to maximise funds by maintaining a transparent chain of funds between giver and reciever.
        Understanding the improvement of a particular region will help understand the development rate. The database scope mainly focuses on the flow of funds to a sundry of receivers depending on the need and requirement. The platform helps to redirect funds to multiple sources and unlike generic systems, it does not focus on one sector only. There are no such centralised systems which aid the need of maintaining current records and help maximize funds while maintaining transparency, thereby currently there are no solutions for the said problem. Education systems, hunger sustainability, transparent resource management are few of the many approaches achievable by the database system.
       </font></center> </p>
  </div>
      </body>
      
      
    );
  }
}
 
export default About;