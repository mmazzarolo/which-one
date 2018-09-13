<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/which-one/master/.github/which-one-white-bg.png" width="420"></img><br />  <br /> 
<a href="http://mmazzarolo.com/which-one/">Give it a try!</a> 
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
- Card set can be easily customized


### Stuff I learned while building it
#### TypeScript and MobX works really well together
I did try the TypeScript + MobX combo in the past but I wasn't able to type the `inject` as I wanted.  
In fact, instead of injecting the entire stores, I like to pass to the `inject` a function (that I call `mapStoresToProps`) that allows me to decouple the component/container from the store like with the Redux `mapStateToProps`.  
This time though I was able to fix it using [this nice little trick](https://github.com/mmazzarolo/which-one/blob/master/src/%40types/mobx-react.d.ts), suggested [here](https://github.com/mobxjs/mobx-react/issues/256), that makes the `inject` works perfectly 🎉.


#### Mobile Safari touch delay is here to stay
The touch delay on Safari for iOS is still here and is super annoying when building small games like this. 
Playing on Chrome or by installing the app on the home screen works perfectly though.  

## Acknowledgments
All the images and icons used in the project are available on [FlatIcon](https://www.flaticon.com/).
