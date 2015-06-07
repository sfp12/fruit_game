$(document).ready(function(){

	var myObject=(function(){
		//变量
		var images_num=25;   //总的图片个数
		var array_ran=[];   //存储所有随机生成的图片序号
		var same_flag=0;    //当前与之前是否相同
		var score=0;   //总得分
		var score_no=0;   //级数切换前的得分
		var level=1;   //级数
		var right_num=0;   //连续正确的数目
		var wrong_num=0;   //连续错误的数目		
		var maxtime = 5*60;   //总时间
		var ran=0;   //之前图片的序号
		var test_ran=0;   //当前图片的序号
		var same_or_set;   //判断之前与当前是否相同的setInterval
		var timer_set;   //计时器的setInterval
		var static_time=1000;   //静止的时间
		var dynamic_time=1000;   //滑动的时间
		var button_n='';   //当前的按键
		var score_n='';   //当前的得分
		var correct_n='';   //正确的按键
		var start_time_n;   //开始的时间，第n局
		var button_time_n;   //按键的时间，第n局
		var time_n;   //按键反应的时间，第n局
		var flag_n=0;   //只捕获第一次按键，第n局
		var game_id=0;   //第n局游戏。
		var com_no=0;   //与局数是不同的。
		var button_no='';   //记录一次级数切换前的按键。
		var start_time_no;   //记录级数切换前的开始时间。
		var end_time_no;   //记录级数切换前的结束时间。
		var time_no;   //记录级数切换前的间隔时间。
		var level_interval_time=800;   //等级的间隔时间。提示显示的时间
		var level_interval_time_1=800;   //等级的间隔时间。空屏的时间。		
		var newImg;   //新生成的元素。
		var ran_num;   //当前数组中的元素个数。
		var audio_obj;   //音频对象
		var foot_obj;   //音频容器
		var zd_time=300;   //抖动的时间。
		var minutes;   //时间，分钟
		var seconds;   //时间，秒

		//需要记录的变量	
		var radioset="";
		var buttonset="";  //按键情况
		var numset="";    //得分情况
		var commentset="";   //存的内容很复杂
		var type4set="";   //内容为0
		var timeset="";   //用户按键的反应时间
		var stimidset="";   //游戏的局数
		var eventtimeset="";
		var eventelapseset="";
		var correctanswerset="";   //正确的按键反应
		var radiolist1set="";   //以下内容为空
		var radiolist2set="";
		var radiolist3set="";
		var radiolist4set="";
		var radiolist5set="";
		var radiolist6set="";
		var radiolist7set="";
		var radiolist8set="";
		var radiolist9set="";
		var radiolist10set="";

		//按下任意键后触发的函数，游戏开始
		var start=function(){
			// 游戏开始的时间
			start_time_no=new Date();
			// 修改等级
			$('#level_value').text(level);
			// 进度条的修改
			progress();
			//加37和39的监听事件
			$('body').keydown(key_down);
			//随机生成初始图片:第一张
			var img=document.getElementById('img');
			ran=Math.floor(Math.random()*images_num);
			array_ran.push(ran);
			img.setAttribute('src','fruit/'+ran+'.png');			
			//感觉这里不需要，还是留着吧。
			button_n=';';
			score_n=';';
			correct_n=';';
			time_n=0;
			//判断当前和之前是否相同
			same_or();				
		};

		// 点击事件
		var click_event=function(){
			$('#match').click(function(){
				if(ran_num>level&&(flag_n==0)){	
					button_n='2;';	
					if(same_flag==1){
						$('#result').css('background-image', 'url(fruit/right.png)');					
						$('#result_s').text('+10!');
						score+=10;
						score_no+=10;
						right_num++;					
						audio_obj=createAudio('right');					
						score_n='10;';
					}else{
						$('#result').css('background-image', 'url(fruit/wrong.png)');					
						$('#result_s').text('-10!');
						score-=10;
						score_no-=10;
						right_num=0;
						wrong_num++;
						audio_obj=createAudio('wrong');
						score_n='-10;';
					}
					click_before_level_change();
				}				
			});
			$('#no_match').click(function(){
				if(ran_num>level&&(flag_n==0)){					
					button_n='1;';					
					if(same_flag==0){
						$('#result').css('background-image', 'url(fruit/right.png)');					
						$('#result_s').text('+10!');
						score+=10;
						score_no+=10;
						right_num++;					
						audio_obj=createAudio('right');					
						score_n='10;';
					}else{
						$('#result').css('background-image', 'url(fruit/wrong.png)');					
						$('#result_s').text('-10!');
						score-=10;
						score_no-=10;
						right_num=0;
						wrong_num++;
						audio_obj=createAudio('wrong');
						score_n='-10;';
					}
					click_before_level_change();
				}				
			});	
		};

		// 点击后，等级改变前的函数
		var click_before_level_change=function(){
			flag_n=1;   //按了一次键
			button_time_n=new Date();
			time_n=button_time_n-start_time_n;
			//把第一个音频删掉
			foot_obj=document.getElementById('foot');
			foot_obj.removeChild(foot_obj.childNodes[0]);			
			
			$('#result').css('width', '44px');
			$('#result').css('margin-left', '0px');	
			//把音频加入，也就是触发
			$('#foot').append(audio_obj);
			//改变分数
			$('#score_value').text(score);
			//呈现图片。
			$('#result').show();
			$('#result_s').show();
			//图片消失
			var result_set=setTimeout(function(){
				$('#result').css('display', 'none');
				$('#result_s').css('display', 'none');
			},500);	
			// 改变等级
			if(right_num>=5||wrong_num>=5){
				if((level==1)&&(wrong_num>=5)){

			}else{
				level_change();
			}
														
			}
		};		

		// 进度条的函数
		var progress=function(){
			var li_array=document.getElementById('sign_ul').children;			
			if(level%3==1){
				li_array[0].style.backgroundColor="Red"; 
				li_array[2].style.backgroundColor="#cbcbcb";
			}else if(level%3==2){
				li_array[1].style.backgroundColor="Red";
				li_array[0].style.backgroundColor="#cbcbcb";
			}else{
				li_array[2].style.backgroundColor="Red";
				li_array[1].style.backgroundColor="#cbcbcb";
			}
		};

		//判断当前与之前是否相同
		var same_or=function(){
			// 全局的setInterval
			same_or_set=setInterval(function(){
				com_no++;
				time_no=(new Date())-start_time_no;
				button_no+=button_n;

				//在这里加commentset.
				commentset+='no:'+com_no+'.';
				commentset+='level:'+level+'.';
				commentset+='picture:'+array_ran.join(',')+'.';
				commentset+='press:'+button_no.substring(0,button_no.length-1).split(';').join(',')+'.';
				commentset+='time:'+time_no+'.';
				commentset+='getPoints:'+score_no+'.';
				commentset+='score:'+score+';';		
				// 生成一个新img
				test_ran=imgNew();
				// 判断当前是第几张图片
				ran_num=array_ran.length;
				// 找出与第几张图片相比
				var before=ran_num%level-1;
				if(-1==before){
					before=level-1;
				}
				// 举例，ran_num为2，level为1。第二张图片与第一张图片进行比较。到第二张图片才开始比较。
				if(ran_num>level){					
					// 前一次滑动时，time_n为0，也就是没有按键或点击。
					if(time_n==0){
						time_n=1300;
					}
					// 举例，ran_num为3，level为1。第三张图片产生后才开始记录第二张的情况。
					if(ran_num>level+1){						
						buttonset+=button_n;
						numset+=score_n;
						correctanswerset+=correct_n;						
						timeset+=time_n+';';
						stimidset+=game_id+';';						
						type4set+='0;';
						radioset+=';';
						eventtimeset+=";";
						eventelapseset+=";";
						radiolist1set+=';';
						radiolist2set+=';';
						radiolist3set+=';';
						radiolist4set+=';';
						radiolist5set+=';';
						radiolist6set+=';';
						radiolist7set+=';';
						radiolist8set+=';';
						radiolist9set+=';';
						radiolist10set+=';';						
					}
					// 举例，ran_num为3，level为1。第三张图片产生后，判断第二张时是否按键。
					if(ran_num>level+1){
						// 第二张时没有按键
						if(flag_n==0){
							//防止多次按键或点击.
							// flag_n=1;							
							clearInterval(same_or_set);
							// 呈现mis
							$('#result').css('background-image', 'url(fruit/mis.png)');
							$('#result').css('width', '100px');
							$('#result').css('margin-left', '-50px');
							audio_obj=createAudio('wrong');
							$('#foot').append(audio_obj);							
							$('#result').show();												
							// 震动
							zd();
							//震动完后,图片滑动,时间与震动相同.
							setTimeout(function(){								
								slide();
								// 滑动完后,mis消失.
								$('#result').css('display', 'none');
								same_or();
								flag_n=0;
							},zd_time);
						}else{
							// 之前有按键
							flag_n=0;							
							slide();
						}
					}else{
						// 这是第一张或第二张，还没开始检测。
						flag_n=0;						
						slide();
					}					

					if(array_ran[before]==test_ran){
						//当前水果与之前水果相同
						same_flag=1;
						correct_n='2;';
					}else{
						//不相同	
						same_flag=0;
						correct_n='1;';
					}

					game_id++;					
				}else{
					// 还没开始比较。
					flag_n=0;					
					slide();
				}
				//把当前的按键记录为空
				button_n=';';
				score_n=';';				
				time_n=0;						
				
			},dynamic_time+static_time);

		}	

		var slide=function(){
			$('#img').animate({
			    opacity: 0,
			    left: '-=400'    
			  }, dynamic_time, function() { 					    
			});

			$('#new_img').animate({
			    opacity: 1,
			    left: '-=400'    
			  }, dynamic_time, function() {					    
			    pic.removeChild($("#pic").children("img")[0]);
				newImg.setAttribute('id','img');
				newImg.setAttribute('class','img');
			});
		};	

		//计时器函数
		var timer = function(){
			timer_set=setInterval(function(){
				if(maxtime>=0)
				{
					minutes = Math.floor(maxtime/60); 
					seconds = Math.floor(maxtime%60);
					if(seconds<10){			
						$('#time_value').text(minutes+':0'+seconds);
					}else{			
						$('#time_value').text(minutes+':'+seconds);
					}					  		  
					--maxtime;   
				}else{ 	
					end();
					clearInterval(same_or_set);										
					clearInterval(timer_set);				
				} 
			},1000);
		};	

		//计时器函数
		var timer_start = function(){			
			minutes = Math.floor(maxtime/60); 
			seconds = Math.floor(maxtime%60);
			if(seconds<10){			
				$('#time_value').text(minutes+':0'+seconds);
			}else{			
				$('#time_value').text(minutes+':'+seconds);
			}						
		};		

		//按下37或39的监听事件
		var key_down=function(event){
			if((event.which==37||event.which==39)&&flag_n==0&&(ran_num>level)){
				var result;

				if(event.which==37){
					button_n='1;';
					//不一样					
					if(same_flag==1){
						//一样
						result='wrong';					
					}else{
						//不一样
						result='right';					
					}
				}else{
					button_n='2;';
					//一样					
					if(same_flag==1){
						//一样
						result='right';						
					}else{
						//不一样
						result='wrong';						
					}
				}

				if(result=='right'){
					$('#result').css('background-image', 'url(fruit/right.png)');
				
					$('#result_s').text('+10!');
					score+=10;
					score_no+=10;
					right_num++;					
					audio_obj=createAudio('right');					
					score_n='10;';
				}else{
					$('#result').css('background-image', 'url(fruit/wrong.png)');
			
					$('#result_s').text('-10!');
					score-=10;
					score_no-=10;
					right_num=0;
					wrong_num++;
					audio_obj=createAudio('wrong');
					score_n='-10;';
				}
			
				click_before_level_change();
			}			
		};

		var createAudio = function(name){	
			//创建一个新的object DOM		
			var audio = document.createElement('object');
			$(audio).addClass('audio');
			var data ="fruit/";
			switch(name){
				case "right":
					data+="happy.wav";
					break;
				case "wrong":
					data+="unhappy.wav";
					break;				
			}
			$(audio).attr('data',data);			

			return audio;
		}		

		var imgNew=function(){	
			start_time_n=new Date();			

			var pic=document.getElementById('pic');
			//新建一个img的DOM
			var ran=Math.floor(Math.random()*images_num);	
			array_ran.push(ran);
			newImg=document.createElement('img');  			
			newImg.setAttribute('src','fruit/'+ran+'.png');
			newImg.setAttribute('class','new_img');
			newImg.setAttribute('id','new_img');	

			pic.appendChild(newImg);			
			return ran;
		};

		var zd=function(){ 		
			flag_n=1;	
			var a=['top','left'],b=0; 
			var u=setInterval(function(){ 
			document.getElementById('pic_mask').style[a[b%2]]=(b++)%4<2?'0px':'4px'; 
			if(b>zd_time/30){clearInterval(u);b=0} 
			},30) 
		};

		//等级改变时的函数
		var level_change=function(){


			//记录字段
			buttonset+=button_n;
			numset+=score_n;
			correctanswerset+=correct_n;					
			timeset+=time_n+';';
			stimidset+=game_id+';';
			button_no+=button_n;
			type4set+='0;';
			radioset+=';';
			eventtimeset+=";";
			eventelapseset+=";";
			radiolist1set+=';';
			radiolist2set+=';';
			radiolist3set+=';';
			radiolist4set+=';';
			radiolist5set+=';';
			radiolist6set+=';';
			radiolist7set+=';';
			radiolist8set+=';';
			radiolist9set+=';';
			radiolist10set+=';';

			com_no++;
			time_no=(new Date())-start_time_no;
			//在这里加commentset.
			commentset+='no:'+com_no+'.';
			commentset+='level:'+level+'.';
			commentset+='picture:'+array_ran.join(',')+'.';
			commentset+='press:'+button_no.substring(0,button_no.length-1).split(';').join(',')+'.';
			commentset+='time:'+time_no+'.';
			commentset+='getPoints:'+score_no+'.';
			commentset+='score:'+score+';';

			if(right_num>=5){
				level++;
			}else{
				level--;
				if(level==0){
					level=1;
				}
			}

			$("body").unbind('keydown');										
			
			$('#level_change').css('background-color','gray');
			$('#level_change').text('等级升级为:'+level+';请判断第1张图片与第'+(level+1)+'张图片是否一样');
			$('#level_change').show();

			right_num=0;
			wrong_num=0;
			array_ran=[];
			same_flag=0;
			time_no=0;
			score_no=0;
			button_no='';
			
			clearInterval(same_or_set);
			setTimeout(function(){						
				$('#level_change').hide();						
				$('#container').hide();
				setTimeout(function(){	
					$('#container').show();							
					start();
				},level_interval_time_1);

			},level_interval_time);
		};

		//游戏结束时的函数
		var end=function(){			 

			$('#container').hide();	

			var obj=document.getElementById('record');

		    var radioset_p=document.createElement('p');
		    $(radioset_p).text('radioset:'+radioset);

		    var buttonset_p=document.createElement('p');
		    $(buttonset_p).text('buttonset:'+buttonset);

		    var numset_p=document.createElement('p');
		    $(numset_p).text('numset:'+numset);

		    var commentset_p=document.createElement('p');
		    $(commentset_p).text('commentset:'+commentset);

		    var type4set_p=document.createElement('p');
		    $(type4set_p).text('type4set:'+type4set);

		    var timeset_p=document.createElement('p');
		    $(timeset_p).text('timeset:'+timeset);

		    var stimidset_p=document.createElement('p');
		    $(stimidset_p).text('stimidset:'+stimidset);

		    var eventtimeset_p=document.createElement('p');
		    $(eventtimeset_p).text('eventtimeset:'+eventtimeset);

		    var eventelapseset_p=document.createElement('p');
		    $(eventelapseset_p).text('eventelapseset:'+eventelapseset);

		    var correctanswerset_p=document.createElement('p');
		    $(correctanswerset_p).text('correctanswerset:'+correctanswerset);

		    var radiolist1set_p=document.createElement('p');
		    $(radiolist1set_p).text('radiolist1set:'+radiolist1set);

		    var radiolist2set_p=document.createElement('p');
		    $(radiolist2set_p).text('radiolist2set:'+radiolist2set);

		    var radiolist3set_p=document.createElement('p');
		    $(radiolist3set_p).text('radiolist3set:'+radiolist3set);

		    var radiolist4set_p=document.createElement('p');
		    $(radiolist4set_p).text('radiolist4set:'+radiolist4set);

		    var radiolist5set_p=document.createElement('p');
		    $(radiolist5set_p).text('radiolist5set:'+radiolist5set);

		    var radiolist6set_p=document.createElement('p');
		    $(radiolist6set_p).text('radiolist6set:'+radiolist6set);

		    var radiolist7set_p=document.createElement('p');
		    $(radiolist7set_p).text('radiolist7set:'+radiolist7set);

		    var radiolist8set_p=document.createElement('p');
		    $(radiolist8set_p).text('radiolist8set:'+radiolist8set);

		    var radiolist9set_p=document.createElement('p');
		    $(radiolist9set_p).text('radiolist9set:'+radiolist9set);

		    var radiolist10set_p=document.createElement('p');
		    $(radiolist10set_p).text('radiolist10set:'+radiolist10set);    

		    obj.appendChild(radioset_p);
			obj.appendChild(buttonset_p);  //按键情况
			obj.appendChild(numset_p);    //得分情况
			obj.appendChild(commentset_p);   //存的内容很复杂
			obj.appendChild(type4set_p);   //内容为0
			obj.appendChild(timeset_p);   //用户按键的反应时间
			obj.appendChild(stimidset_p);   //游戏的局数
			obj.appendChild(eventtimeset_p);
			obj.appendChild(eventelapseset_p);
			obj.appendChild(correctanswerset_p);   //正确的按键反应
			obj.appendChild(radiolist1set_p);   //以下内容为空
			obj.appendChild(radiolist2set_p);
			obj.appendChild(radiolist3set_p);
			obj.appendChild(radiolist4set_p);
			obj.appendChild(radiolist5set_p);
			obj.appendChild(radiolist6set_p);
			obj.appendChild(radiolist7set_p);
			obj.appendChild(radiolist8set_p);
			obj.appendChild(radiolist9set_p);
			obj.appendChild(radiolist10set_p);

			var array=numset.split(';');
			var right_count=0;
			for(var i=0;i<array.length;i++){
			  if(array[i]=='10'){
			    right_count++;
			  }
			}
			var rate=right_count/(numset.split(';').length-1);

			$('#level_change').text('正确率:'+rate+';得分:'+score);
			$('#level_change').css('background-color','white');
			$('#level_change').show();
		}; 

		return {
			start:start,						
			timer:timer,			
			click_event:click_event,
			timer_start:timer_start,
		};
	})();	

	myObject.timer_start();	
	
	//点击了play按钮后触发的事件
	$("#play").click(function(){	
		// 这些都是显示和隐藏的处理		
		$('#game_rule').hide();
		$('#pic_mask').show();
		$('#pic').show();
		$('#sign').show();					
		$('#play').hide();
		$('.match_or').show();
		// $('.match_or').test();
		// 添加点击匹配或不匹配的事件
		myObject.click_event();
		//计时器和等级
		myObject.timer();
		//按下任意键后，触发start函数。
		myObject.start();
	});

});
