import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ChatServiceService } from 'src/app/services/chat-service.service'
import { interval } from 'rxjs'

class Message {
	owner: string
	message: string
	constructor() {
		this.owner = ''
		this.message = ''
	}
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
	constructor(private chatSvc: ChatServiceService) {}
	messages: Message[] = []
	messageModel = new Message()
	canSendMessage = true
	@ViewChild('convoBox') convoBox: ElementRef
	@ViewChild('inputBox') inputBox: ElementRef

	ngOnInit() {}

	async post(evt) {
		if (evt.charCode === 13) {
			this.messageModel.owner = 'user'
			this.messages.push(this.messageModel)
			this.canSendMessage = false
			await this.chatSvc.sendMessage(this.messageModel.message).then((resp) => {
				this.messageModel = new Message()
				const botMessage = new Message()
				botMessage.owner = 'bot'
				botMessage.message = resp['response']
				this.messages.push(botMessage)
				this.canSendMessage = true
				const timeout = interval(1).subscribe((i) => {
					this.inputBox.nativeElement.focus()
					timeout.unsubscribe()
				})
			})
			// this.convoBox.nativeElement.scrollTop = this.convoBox.nativeElement.scrollHeight
		}
		// this.posts.push(this.feed)
		// this.posts.reverse()
		// this.feed = new Feed()
	}
}
