import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private app: AppComponent) { }

  private curSlide: number;
  private slides: HTMLCollection;
  private slides_container: Element;
  private slides_length: number;
  private indicators: HTMLCollection;

  ngOnInit() {
    this.curSlide = 1;
    this.slides_container = document.querySelector('.myCar');
    this.slides = document.getElementsByClassName('mySlide');
    this.slides_length = this.slides.length;
    this.indicators = document.getElementsByClassName('indicator');
    this.indicators[0].classList.add('curIndicator');

    // I don't know why 'function () {this.nextSlide()}' doesn't work
    // setInterval(() => {
    //   this.nextSlide();
    // },7000);
  }

  prevSlide() {
    let arr = ['show1','show2','show3'];
    this.slides_container.classList.remove(...arr);
  
    if (this.curSlide != 1) {
      --this.curSlide;
      this.slides_container.classList.toggle('show'+this.curSlide);
    }
    else if (this.curSlide = 1) {
      this.curSlide = this.slides_length;
      this.slides_container.classList.toggle('show'+this.slides_length);
    }

    this.changeIndicator();
  }

  nextSlide() {
    let arr = ['show1','show2','show3'];
    this.slides_container.classList.remove(...arr);
  
    if (this.curSlide != this.slides_length) {
      ++this.curSlide;
      this.slides_container.classList.toggle('show'+this.curSlide);
    }
    else if (this.curSlide == this.slides_length) {
      this.curSlide = 1;
      this.slides_container.classList.toggle('show'+this.curSlide);
    }

    this.changeIndicator();
  }

  switchSlide(event) {
    let target = event.target;
    this.curSlide = target.dataset.slide;
    
    let arr = ['show1','show2','show3'];
    this.slides_container.classList.remove(...arr);

    this.slides_container.classList.toggle('show'+this.curSlide);
    this.changeIndicator();
  }

  changeIndicator() {
    for (let i=0; i<this.indicators.length; i++)
      this.indicators[i].classList.remove('curIndicator');
    this.indicators[this.curSlide-1].classList.add('curIndicator');
  }

  async foo() {
    var array = [/* some data that will be used async*/];

    //This loop will wait for each next() to pass the next iteration
    for (var i = 0; i < 100; i++) { 
        await new Promise(next=> {
          setTimeout(function () {
            console.log(i);
          },2000);
          next();
        })        
    }
  }
}
