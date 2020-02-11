import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../service/sidenav.service';
import { BoardListModel } from 'src/app/shared/trello/trello.model';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public boards: Array<BoardListModel>

  constructor(
    public sidenavService: SidenavService,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() { }

}
