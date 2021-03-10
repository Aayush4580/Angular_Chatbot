import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { Router } from "@angular/router";
import { ChatService } from "./chat.service";
import { Message } from "./message";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  user: any;
  public message: Message;
  public messages: Message[];

  // Code for Scrolling
  @ViewChild("chatlist", { read: ElementRef, static: false })
  chatList: ElementRef;
  @ViewChildren(AppComponent, { read: ElementRef })
  chatItems: QueryList<AppComponent>;

  constructor(private chatService: ChatService, private router: Router) {
    this.message = new Message("", "assets/user.png", new Date());
    this.messages = [
      new Message("Welcome to chatbot universe", "assets/bot.png", new Date()),
    ];
  }

  ngOnInit() {
    // this.user = localStorage.getItem("user");
    // console.log(this.user, "logged in user");
    if (!this.user) this.router.navigateByUrl("");
  }

  ngAfterViewInit() {
    this.chatItems.changes.subscribe((elements) => {
      this.scrollToBottom();
    });
  }

  sendMessage() {
    this.message["timestamp"] = new Date();
    this.messages.push(this.message);
    this.chatService.getResponse(this.message["content"]).subscribe((res) => {
      this.messages.push(
        new Message(res.result.fulfillment.speech, "assets/bot.png", new Date())
      );
      this.scrollToBottom();
    });

    this.message = new Message("", "assets/user.png", new Date());
  }

  private scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    } catch (err) {
      console.log('Could not find the "chatList" element.');
    }
  }
}
