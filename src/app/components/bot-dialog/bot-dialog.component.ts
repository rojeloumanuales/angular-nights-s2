import { Component, OnInit, Input } from '@angular/core'

@Component({
	selector: 'app-bot-dialog',
	templateUrl: './bot-dialog.component.html',
	styleUrls: [ './bot-dialog.component.scss' ]
})
export class BotDialogComponent implements OnInit {
	constructor() {}
	@Input() owner: string
	@Input() message: string

	ngOnInit() {}
}
