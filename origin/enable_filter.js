function enable_filter(){
   var post_data;
   post_data = "mac_filter_enable=true"
   post_data += "&mac_exclude_mod=BLOCKED"
   axios.post( location.pathname+"?save",post_data)
}
