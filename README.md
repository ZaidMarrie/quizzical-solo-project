# Quizzical Trivia App (React)

## Overview

A Trivia quiz app built with React. The App pulls 5 random questions and gives the user 4 answer options to select from. Questions and answers data is pulled from the [OTDB API](https://opentdb.com/api_config.php).

### The challenge
- To conditionally render two screens (start screen & quiz questions screen)
- To pull 5 questions from the The Open Trivia Database(OTDB) API
- Tally correct answers after *check answers* button is clicked
- Style and polish the app as in the [figma design](https://opentdb.com/api_config.php)

### Screenshot

![Start Screen](https://user-images.githubusercontent.com/84665360/145670761-bebd9130-ea1f-4dea-9f38-e4fd3aed1c64.png)
![Quiz Screen](https://user-images.githubusercontent.com/84665360/145670794-dc8b761f-29e8-4d70-b779-6ddc988cd5b6.png)



### Links

- [Live App Demo](https://quizzical-trivia-app.netlify.app/)
- [Source Code](https://github.com/ZaidMarrie/quizzical-trivia-app)

## My Process

### Built with

- HTML
- CSS
- JavaScript
- React (create-react-app)

### What I learned

I learned and practiced the following concepts:

- React Props
- React State
- React Hooks
    - useState
    - useEffect
- Conditional Rendering

**A snippet of the code I used**
```javascript
import React from 'react'
import blobTop from './images/blobs1.png'
import blobBottom from './images/blob5.png'

function Opening(props) {
    return (
        <div className='opening'>
            <h1 className='opening-title'>Quizzical</h1>
            <p className='opening-desc'>Some description if needed</p>
            <button className='start-btn btn' onClick={props.initGame}>
                Start quiz
            </button>

            {/* Decorative Elements(blobs) */}
            <img src={blobTop} alt='' aria-hidden='true' className='opening-blob-top' />
            <img src={blobBottom} alt='' aria-hidden='true' className='opening-blob-bottom' />
        </div>
    )
}

export default Opening
```

## Author

- Github - [@ZaidMarrie](https://github.com/ZaidMarrie)
- Twitter - [@LeKoels27](https://twitter.com/LeKoels27)

## Contributing
Pull requests are very welcome and you may freely fork this repository.

## Supporting Scrimba

Since 2017, scrimba has created over 20 free courses and continue's launching free courses. If you perhaps are interested in learning or maybe just would like to up your skills try out their courses at [scrimba.com](www.scrimba.com).

- [Become a professional React developer](https://scrimba.com/course/greact)
- [The Responsive Web Design Bootcamp](https://scrimba.com/course/gresponsive)
- [The Ultimate JavaScript Bootcamp](https://scrimba.com/course/gjavascript)  

Happy Coding!

## License
[MIT](https://choosealicense.com/licenses/mit/)
