import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelloWorldBean, WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  welcome_message = 'Welcome '
  welcome_message_from_service = ''
  name = ''

  constructor(private route: ActivatedRoute,
    private welcomeDataService: WelcomeDataService
  ) {

  }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name']
  }

  getWelcomeMessage(): void {
    this.welcomeDataService.executeHelloWorldService().subscribe({
      next: res => this.handleSuccessfulResponse(res),
      error: error => this.handleErrorResponse(error)
    })
  }

  handleErrorResponse(error: any): void {
    this.welcome_message_from_service = error.error.message
  }

  handleSuccessfulResponse(res: HelloWorldBean): void {
    this.welcome_message_from_service = res.message
  }
  
}


