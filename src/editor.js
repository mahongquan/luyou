import React from 'react';
import Client from './Client_request';
import myglobal from './myglobal';
import DlgWebview from './DlgWebview2';
// const funcs = require('./funcs.js');


class A4Lian extends React.Component {
  constructor(props) {
    super(props);
    this.state={showWebview:false,url:""};
    myglobal.app=this;
  }
  show_webview=(url)=>{
    this.setState({showWebview:true,url:url});
  }  
  login=()=>{
    Client.login( res => {
      console.log(res);
      // if (res.success) {
      //   this.setState({
      //     logined: true,
      //   });
      //   this.setState({
      //     user: data.username,
      //   });
      //   this.handleUserChange(this.state.user);
      // }
    },(error)=>{
      console.log(error);
      myglobal.app.show_webview(error.response.url);
    });
  }
  render() {
    console.log(this.state);
    return (
      <div >
        <div className="only_screen">hello</div>
        <button onClick={this.login}>login</button>
        <button onClick={()=>{this.show_webview("http://127.0.0.1:8001")}}>webview</button>
        <DlgWebview
          open={this.state.showWebview}
          url={this.state.url}
          onClose={() => {
            this.setState({ showWebview: false });
          }}
        />
      </div>
    );
  }
}
export default A4Lian;
