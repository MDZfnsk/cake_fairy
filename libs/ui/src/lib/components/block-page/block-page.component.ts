import { Component } from '@angular/core';

@Component({
  selector: 'ui-blok-page',
  templateUrl: './block-page.component.html',
  styleUrls: ['./block-page.component.scss']
})
export class BlockPageComponent {


  redirectToMail(){   
  
  // const mailtoUrl = "https://mail.google.com/mail/u/0/?fs=1&to=cakefairybysnm@gmail.com&tf=cm";
  const mailtoUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=cakefairybysnm%40gmail.com&su=To%20inquire%20about%20my%20account%20ban&body=My%20account%20has%20been%20banned%20and%20I%20need%20to.......";
  
  // Open the mailto URL in a new window
  window.open(mailtoUrl);   
    
  }

}
