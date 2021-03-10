import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  private token: string = "63db21b6d636493ebd96662f21c3206d";

  constructor(private http: HttpClient) {}

  getResponse(query: string): Observable<any> {
    let data = {
      query: query,
      lang: "en",
      sessionId: "1234567",
    };
    console.log("query >> ", data);
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${this.token}`);

    return this.http.post(this.baseURL, data, { headers: headers });
  }
}
