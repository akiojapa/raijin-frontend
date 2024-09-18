import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from "./components/loading/loading.component";
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'raijin-frontend';

  constructor(
    private loadingService: LoadingService
  ) {}

  // ngOnInit() {
  //   this.loadingService.loadingOn();
  // }

}
