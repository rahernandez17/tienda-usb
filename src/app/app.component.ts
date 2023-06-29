import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  opened = false;

  constructor(private readonly router: Router) {}

  toggleSideNav(): void {
    this.opened = !this.opened;
  }

  async redirectTo(url: string): Promise<boolean> {
    return await this.router.navigateByUrl(url);
  }
}
