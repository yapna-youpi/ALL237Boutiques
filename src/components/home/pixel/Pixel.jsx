import React from 'react';
import ReactPixel from 'react-facebook-pixel';


function Pixel() {

    const advancedMatching = { em: 'some@email.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
    const options = {
    autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    debug: false, // enable logs
    };
    ReactPixel.init('109875781411686', advancedMatching, options);

    ReactPixel.pageView(); // For tracking page view
    ReactPixel.track(event, data); // For tracking default events. More info about standard events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#standard-events
    ReactPixel.trackSingle('109875781411686', event, data); // For tracking default events.
    ReactPixel.trackCustom(event, data); // For tracking custom events. More info about custom events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#custom-events
    ReactPixel.trackSingleCustom('109875781411686', event, data);

  return (
        <div>
            
        </div>
    );
}

export default Pixel;
