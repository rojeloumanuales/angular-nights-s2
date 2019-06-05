import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import * as Sentiment from 'sentiment'

@Injectable({
	providedIn: 'root'
})
export class ChatServiceService {
	constructor(private http: HttpClient) {}
	baseUrl = '/api/cakechat'
	chatHistory = []
	sentiment = new Sentiment()

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}

	async sendMessage(message) {
		const emotions = [ 'joy', 'fear', 'sadness', 'neutral', 'anger' ]
		let emotion = ''
		this.chatHistory.push(message)
		if (this.chatHistory.length > 3) {
			this.chatHistory = this.chatHistory.slice(-3)
		}

		let averageScore = 0
		this.chatHistory.forEach((chat) => {
			averageScore += this.sentiment.analyze(chat)['score']
		})

		averageScore = averageScore / this.chatHistory.length

		if (averageScore > 0.5) {
			const emotions = [ 'joy', 'fear', 'anger', 'neutral' ]
			emotion = emotions[Math.random() * 4]
		} else if (averageScore <= 0.5 && averageScore >= -0.5) {
			const emotions = [ 'joy', 'neutral', 'sadness' ]
			emotion = emotions[Math.random() * 3]
		} else if (averageScore < -0.5) {
			const emotions = [ 'sadness', 'fear', 'anger', 'joy' ]
			emotion = emotions[Math.random() * 4]
		}

		const url = `${this.baseUrl}/get_response`
		const data = {
			context: this.chatHistory,
			emotion: emotion,
			from_cakechat: true
		}

		console.log(this.chatHistory)
		console.log(averageScore)

		return this.http.post(url, data, this.httpOptions).toPromise()
	}
}
