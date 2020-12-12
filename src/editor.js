import React from 'react';
import Client from './Client_request';
const cheerio = require('cheerio');
class A4Lian extends React.Component {
  constructor(props) {
    super(props);
    this.state={url:"",content:""};
  }
  login=()=>{
   Client.login( "mahongquan","333333",(res)=> {
      console.log("success==================")
      console.log(res);
      // let $ = cheerio.load(res.body,{
      //  xmlMode: true,
      //  lowerCaseTags: false
      // });
      // let div=$("body");
      // this.setState({content:div.html()});
    },(res)=>{
      console.log("error===================")
      console.log(res);
      // let $ = cheerio.load(res.body,{
      //  xmlMode: true,
      //  lowerCaseTags: false
      // });
      // let div=$("body");
      // this.setState({content:div.html()});
    });
  }
  login_index=()=>{
    Client.get("/admin", undefined,(res)=> {
      console.log("success==================")
      console.log(res);
      let $ = cheerio.load(res.body,{
       xmlMode: true,
       lowerCaseTags: false
      });
      let div=$("body");
      this.setState({content:div.html()});
    },(res)=>{
      console.log("error===================")
      console.log(res);
      let $ = cheerio.load(res.body,{
       xmlMode: true,
       lowerCaseTags: false
      });
      let div=$("body");
      this.setState({content:div.html()});
    });
    //wlan_config.cgi
  }
  wlan_config=()=>{
    Client.contacts(undefined,(res)=> {
      console.log("success==================")
      console.log(res);
    },(res)=>{
      console.log("error===================")
      console.log(res);
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
