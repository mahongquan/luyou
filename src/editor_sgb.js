import React from 'react';
import Client from './Client_fetch_sgb';
const cheerio = require('cheerio');
class A4Lian extends React.Component {
  constructor(props) {
    super(props);
    this.state={url:"",content:""};
  }
  login=()=>{
   Client.login( (res)=> {
      console.log("success==================")
      console.log(res);
      res.text().then((body)=>{
        let $ = cheerio.load(body,{
         xmlMode: true,
         lowerCaseTags: false
        });
        let div=$("body");
        this.setState({content:div.html()});
      })
    },(res)=>{
      console.log("error===================")
      console.log(res);
      res.text().then((body)=>{
        let $ = cheerio.load(body,{
         xmlMode: true,
         lowerCaseTags: false
        });
        let div=$("body");
        this.setState({content:div.html()});
      })
    });
  }
  login_index=()=>{
    Client.login_index((res)=> {
      console.log("success==================")
      console.log(res);
      res.text().then((body)=>{
        let $ = cheerio.load(body,{
         xmlMode: true,
         lowerCaseTags: false
        });
        let div=$("body");
        this.setState({content:div.html()});
      })
    },(res)=>{
      // console.log("error===================")
      // console.log(res);
      // let $ = cheerio.load(res.text(),{
      //  xmlMode: true,
      //  lowerCaseTags: false
      // });
      // let div=$("body");
      // this.setState({content:div.html()});
    });
    //wlan_config.cgi
  }
  wlan_config=()=>{
    Client.wlan((res)=> {
      console.log(res);
      res.text().then((body)=>{
        let $ = cheerio.load(body,{
         xmlMode: true,
         lowerCaseTags: false
        });
        let div=$("body");
        this.setState({content:div.html()});
      })
    },(res)=>{
      res.text().then((body)=>{
        let $ = cheerio.load(body,{
         xmlMode: true,
         lowerCaseTags: false
        });
        let div=$("body");
        this.setState({content:div.html()});
      })
    });
  }
  render() {
    console.log(this.state);
    return (
      <div >
        <div className="only_screen">hello</div>
        <button onClick={this.login_index}>login_index</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.wlan_config}>wlan_config</button>
        <iframe name="preview" srcDoc={this.state.content} 
        style={{width:"100%",height:"100%"}}>
        </iframe>
      </div>
    );
  }
}
export default A4Lian;
