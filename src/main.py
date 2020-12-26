# -*- coding: utf-8 -*-
import requests
# from bs4 import BeautifulSoup
s = requests.Session()
host='http://bbs.shuiguobang.com'
r = s.get(host)
print(dir(r))
print(r.ok)
def qiandao():
	#'&inajax=1&ajaxtarget=JD_sign'
    r1= s.get(host+'/plugin.php?id=k_misign:sign&amp;operation=qiandao&amp;formhash=f2c8eb72&amp;format=empty&inajax=1&ajaxtarget=JD_sign')
    if r1.ok:
        print("签到成功")
    else:
        print("签到失败")
def getqdPH():
	# res=s.get(host+'/k_misign-sign.html')
	# if res.ok:
	# 	soup = BeautifulSoup(res.content,"html.parser")
		
	pass
def qiandaoPage():
    r1= s.get(host+'/k_misign-sign.html')
    if r1.ok:
        print("连接签到页成功")
    else:
        print("连接签到页失败")
if r.ok:
    print("连接成功")
    r1= s.post(host+'/member.php?mod=logging&action=login&loginsubmit=yes&infloat=yes&lssubmit=yes'
        , data = {'username':'mahongquan',"password":'mhq730208'})
    if r1.ok:
        print("登录成功")
        qiandaoPage()
    else:
        print("登录失败")
else:
    print("连接失败")
