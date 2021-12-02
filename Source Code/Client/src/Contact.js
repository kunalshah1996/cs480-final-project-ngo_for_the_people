import React, { Component } from "react";
import contact_image from "./contact.jpg";

class Contact extends Component {
  render() {
    return (
        <body id = "bgimage">
          <div id="bckimg" style={{ backgroundImage: `url(${contact_image})`,backgroundPosition: 'center',height:700}}>

        
        
        </div>
        <div class="text-block">

        <h3 id = "text-about"><font color ="#FBF9F9"><bold><center>We'd love to chat!</center></bold></font></h3>
        <form>  
        <ul class="list-unstyled"><center>
        <br></br><li>  <input name="name" type="text" class="feedback-input" placeholder="Name" />  </li> <br></br>
        <li>  <input name="email" type="text" class="feedback-input" placeholder="Email" /> </li> <br></br>
        <li> <textarea name="text" class="feedback-input" placeholder="Comment"></textarea></li> <br></br>
        <li> <input type="submit" value="SUBMIT" /></li></center></ul> <br></br>
        </form>


        </div>
        </body>

    );
  }
}
 
export default Contact;