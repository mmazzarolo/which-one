<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/which-one/master/.github/which-one-white-bg.png" width="420"></img><br />  <br /> 
<a href="http://mmazzarolo.github.io/which-one/">Give it a try!</a> 
</p>

&nbsp;  
&nbsp;

<p align="center">Which One is a small game built with React, TypeScript and MobX.</p>

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

- Built using create-react-app-ts and MobX
- Can be used as a boilerplate for small React games
- Fully responsive (looks better on mobile though)
- PWA-like, works offline (still a bit of a WIP)
- Card sets can be easily customized

### Things I learned while building it

#### TypeScript and MobX works really well together

I did try the TypeScript + MobX combo in the past but I wasn't able to type the `inject` as I wanted.  
In fact, instead of injecting the entire stores, I like to pass to the `inject` a function (`mapStoresToProps`) that allows me to decouple the component/container from the stores, just like with the Redux `mapStateToProps`.  
This time though I was able to fix it using [this nice little trick](https://github.com/mmazzarolo/which-one/blob/master/src/%40types/mobx-react.d.ts), suggested [here](https://github.com/mobxjs/mobx-react/issues/256), that makes the `inject` works perfectly 🎉.

#### Create-react-app-ts TSLint preset is still too strict

I've been followint this [issue](https://github.com/wmonk/create-react-app-typescript/issues/333) since its "discovery" and unfortunately it's still here.  
The `create-react-app-ts` TSLint default settings are really _hardcore_ and you'll have to disable them manually in `tslint.json` (or use other complex workarounds).  
Hopefully it's going to be fixed soon.

#### Mobile Safari touch delay is here to stay

The touch delay on Safari for iOS is still here as well, and is super annoying when building small games like this.  
Playing on Chrome or by installing the app on the home screen works perfectly though.

#### Safari doesn't allow playing audio without user interactions

Yep, since Safari 11 the Web Audio API requires each audio.play() to be triggered manually (otherwise you'll get a `The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.` error).  
There are a few workaround for the issue but I still haven't had a chance to test them so I just disable the sound effects on Safari.  
See [New Video Policies for iOS](https://webkit.org/blog/6784/new-video-policies-for-ios/) and [Overcoming iOS HTML5 audio limitations](https://www.ibm.com/developerworks/library/wa-ioshtml5/index.html#N1025A)

## Acknowledgments

All the images and icons used in the project are available on [FlatIcon](https://www.flaticon.com/).
