<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/which-one/master/.github/which-one-white-bg.png" width="420"></img><br />  <br /> 
<a href="http://mmazzarolo.github.io/which-one/">Give it a try!</a> 
</p>

&nbsp;  
&nbsp;

<p align="center">Which One is a small game that has been my playground for testing the TypeScript & Mobx combo</p>

&nbsp;  
&nbsp;

<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/which-one/master/.github/screenshot-1.png" width="240"></img>
<img src="https://raw.githubusercontent.com/mmazzarolo/which-one/master/.github/screenshot-2.png" width="240"></img>
<img src="https://raw.githubusercontent.com/mmazzarolo/which-one/master/.github/screenshot-3.png" width="240"></img>
</p>
 
&nbsp;  
&nbsp;

## Features overview

- Built using [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript) and [MobX](https://github.com/mobxjs/mobx)
- Can be used as a boilerplate for small React games
- Fully responsive (looks better on mobile though)
- PWA-like, works offline (still a bit of a WIP)
- Card sets can be easily customized and extended

### Things I learned while building it

#### TypeScript and MobX work really well together

I already had a chance to try the TypeScript & MobX combo in the past but I wasn't able to type the `inject` as I wished.  
In fact, instead of injecting the entire stores, I prefer passing to the `inject` a function (`mapStoresToProps`) that allows me to decouple the component/container from the stores, just like with the Redux `mapStateToProps`.  
This time though I was able to fix it using [this nice little trick](https://github.com/mmazzarolo/which-one/blob/master/src/%40types/mobx-react.d.ts), suggested [here](https://github.com/mobxjs/mobx-react/issues/256), that makes the `inject` works nicely 🎉.

#### Create-react-app-typescript TSLint preset is still too strict

I've been followint this [issue](https://github.com/wmonk/create-react-app-typescript/issues/333) since its "discovery" and unfortunately it's still here: the `create-react-app-typescript` TSLint default settings are really _hardcore_ and opinionated so you'll probably find yourself disabling a bunch of rules in `tslint.json` (or use other complex workarounds).  
Hopefully it's going to be fixed soon.

#### Mobile Safari touch delay is here to stay

The touch delay on Safari for iOS is still here as well, and is super annoying when building small React/HTML5 games like this one.  
Playing on Chrome or by installing the app on the home screen works perfectly though.

#### Safari doesn't allow playing audio without user interactions

Yep, since Safari 11 the Web Audio API requires each audio.play() to be triggered manually (otherwise you'll get a `The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.` error).  
There are a few workaround for the issue but I still haven't had a chance to test them so I just disables the sound effects on Safari.  
See [New Video Policies for iOS](https://webkit.org/blog/6784/new-video-policies-for-ios/) and [Overcoming iOS HTML5 audio limitations](https://www.ibm.com/developerworks/library/wa-ioshtml5/index.html#N1025A)

## Acknowledgments & Disclaimers

Like a few other projects I published in the past, Which One is not intended to be a serious "game", it's just the result of playing around with new technologies.  
I'm releasing it as OS because I believe it might be helpful to someone.  

All the images and icons used in the project are available on [FlatIcon](https://www.flaticon.com/).
