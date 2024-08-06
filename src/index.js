import { PTW } from 'lib';
import API from 'config/api';

window.PTW = PTW;

// for localhost test

if (process.env.NODE_ENV === 'development') {
  const PARAMS_DEFAULT = {
    game_style: {
      popup_bg: {
        bg_image: `${API.baseUrl}/uploads/images/bg.png`,
        bg_overlay: 'rgba(78, 145, 217, 0.5)',
      },
      color_scheme: {
        bg_window: '#fff',
        bg_wheel: 'rgba(78, 145, 217, 1)',
        bg_indicator_button: '#FF6262',
        text_content: '#303F5E',
        text_wheel: '#fff',
        text_button: '#fff',
      },
      icon:
        "data:image/svg+xml,%3Csvg width='41px' height='40px' viewBox='0 0 41 40' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: sketchtool 60.1 (101010) - https://sketch.com --%3E%3Ctitle%3EF44CF458-9BEC-496C-8E39-4D3229564C5C%3C/title%3E%3Cdesc%3ECreated with sketchtool.%3C/desc%3E%3Cg id='Asset-Artboard-Page' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='popup-primary-icon-icons-secondary/present-icon' transform='translate(0.599998, 0.000000)' fill-rule='nonzero'%3E%3Cg id='gift-box' transform='translate(0.000000, 1.250000)'%3E%3Cpath d='M18.2194535,6.6201563 C17.9876566,6.32664068 12.4932033,-0.56054688 8.15570316,0.0379687503 C6.61773436,0.250312502 5.43328119,1.33125001 4.63539054,3.25070315 C3.53460925,5.89875005 3.44312487,8.05125006 4.36351553,9.64828133 C5.50937494,11.6365626 7.78062502,11.9573438 7.87671877,11.9700782 C7.9021094,11.9734376 7.9277344,11.9750782 7.9533594,11.9750782 L17.7595316,11.9750782 C18.0831254,11.9750782 18.3454692,11.7127345 18.3454692,11.3891407 L18.3454692,6.98328131 C18.3454692,6.85156256 18.3010941,6.7235938 18.2194535,6.6201563 Z' id='Path' fill='%23FF3D43'%3E%3C/path%3E%3Cpath d='M35.2895318,3.25070325 C34.4916412,1.33125005 33.3072662,0.250312509 31.7692975,0.0379687514 C27.432657,-0.560703146 21.9372664,6.32671899 21.7055477,6.6201565 C21.6239071,6.723594 21.5794539,6.85156276 21.5794539,6.98328151 L21.5794539,11.3891411 C21.5794539,11.7127348 21.8417977,11.9750786 22.1653914,11.9750786 L31.9715631,11.9750786 C31.9971881,11.9750786 32.0228131,11.973438 32.0482037,11.9700786 C32.1442975,11.9573442 34.4155474,11.6365629 35.5614068,9.64828161 C36.4818755,8.05117218 36.3903911,5.89875022 35.2895318,3.25070325 Z' id='Path' fill='%23FF3D43'%3E%3C/path%3E%3Cpath d='M17.7596098,9.27976556 L7.95343766,9.27976556 C7.92781266,9.27976556 7.90218766,9.27812493 7.87679704,9.27476556 C7.78070328,9.26203118 5.50945322,8.94132807 4.36359382,6.95296874 C4.14265631,6.56960938 3.98070318,6.15390626 3.87632818,5.7074219 C3.5851563,7.25828123 3.74687505,8.57820307 4.36359382,9.64828117 C5.50945322,11.6365624 7.78070328,11.9573436 7.87679704,11.970078 C7.90218766,11.9734374 7.92781266,11.975078 7.95343766,11.975078 L17.7596098,11.975078 C18.0832036,11.975078 18.3455473,11.7127342 18.3455473,11.3891405 L18.3455473,8.69382807 C18.3455473,9.01742181 18.0832036,9.27976556 17.7596098,9.27976556 Z' id='Path' fill='%23D62D2D'%3E%3C/path%3E%3Cpath d='M35.5614074,6.95296874 C34.415548,8.94124994 32.144298,9.26203118 32.0482042,9.27476556 C32.0228136,9.27812493 31.9971886,9.27976556 31.9715636,9.27976556 L22.1653915,9.27976556 C21.8417977,9.27976556 21.5794539,9.01742181 21.5794539,8.69382807 L21.5794539,11.3891405 C21.5794539,11.7127342 21.8417977,11.975078 22.1653915,11.975078 L31.9715636,11.975078 C31.9971886,11.975078 32.0228136,11.9734374 32.0482042,11.970078 C32.144298,11.9573436 34.415548,11.6365624 35.5614074,9.64828117 C36.1781262,8.57812495 36.339845,7.25828123 36.0486731,5.7074219 C35.9443762,6.15390626 35.782345,6.56960938 35.5614074,6.95296874 Z' id='Path' fill='%23D62D2D'%3E%3C/path%3E%3Cpath d='M22.1653909,6.39734387 L17.7595317,6.39734387 C17.435938,6.39734387 17.1735942,6.65968761 17.1735942,6.98328135 L17.1735942,11.3891405 C17.1735942,11.7127342 17.435938,11.975078 17.7595317,11.975078 L22.1653909,11.975078 C22.4889846,11.975078 22.7513283,11.7127342 22.7513283,11.3891405 L22.7513283,6.98328135 C22.7513283,6.65968761 22.4889846,6.39734387 22.1653909,6.39734387 Z' id='Path' fill='%23D62D2D'%3E%3C/path%3E%3Cpath d='M36.378907,16.5910935 L3.54609372,16.5910935 C3.22249996,16.5910935 2.9601562,16.8534373 2.9601562,17.1770311 L2.9601562,34.2526568 C2.9601562,35.6567193 4.10242185,36.798985 5.50648438,36.798985 L34.4185163,36.798985 C35.8225788,36.798985 36.9648445,35.6567193 36.9648445,34.2526568 L36.9648445,17.1770311 C36.9648445,16.8533592 36.7025007,16.5910935 36.378907,16.5910935 Z' id='Path' fill='%23FFD039'%3E%3C/path%3E%3Cpath d='M39.3390632,10.8032036 L0.58593751,10.8032036 C0.262343754,10.8032036 0,11.0655473 0,11.3891411 L0,17.1769536 C0,17.5005473 0.262343754,17.7628911 0.58593751,17.7628911 L39.3390632,17.7628911 C39.6626569,17.7628911 39.9250007,17.5005473 39.9250007,17.1769536 L39.9250007,11.3891411 C39.9250007,11.0655473 39.6626569,10.8032036 39.3390632,10.8032036 Z' id='Path' fill='%23FFDF65'%3E%3C/path%3E%3Cpath d='M22.8596097,10.8032036 L17.0653129,10.8032036 C16.7417191,10.8032036 16.4793754,11.0655473 16.4793754,11.3891411 L16.4793754,36.2129688 C16.4793754,36.5365626 16.7417191,36.7989063 17.0653129,36.7989063 L22.8596097,36.7989063 C23.1832035,36.7989063 23.4455472,36.5365626 23.4455472,36.2129688 L23.4455472,11.3891411 C23.4455472,11.0655473 23.1832816,10.8032036 22.8596097,10.8032036 Z' id='Path' fill='%23FF3D43'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    },
    content: {
      start: {
        title: 'Get your Christmas present!',
        subtitle: 'One of our awesome gifts already yours! One step more to receive it.',
        button: 'Start',
        form: [
          {
            type: 'email',
            name: 'email',
            checked: true,
            placeholder: 'Email',
          },
          {
            type: 'text',
            name: 'name',
            checked: true,
            placeholder: 'Full Name',
          },
          {
            type: 'text',
            name: 'phone',
            checked: true,
            placeholder: 'Phone Number',
          },
        ],
      },
      progress: {
        title: 'Almost there! And your got',
        subtitle: 'Please wait few second',
      },
      finish: {
        title: 'Congratulations!',
        subtitle: 'You got an awesome gift from us',
        privacy: 'In order to use this discount add it to the relevant field in checkout',
        company_logo: `data:image/png;base64,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`,
      },
    },
    behavior: {
      coupons: [
        {
          id: 'asds-asd13-12312asd-0000',
          probability: 20,
          chanceReal: 20,
          type: 'string',
          value: '15% Discount',
          resultText: '15OFF',
          userData: {
            value: '15% Discount',
          },
        },
        {
          id: 'asds-asd13-12312asd-1111',
          probability: 20,
          chanceReal: 20,
          type: 'string',
          value: 'Free Shipping',
          resultText: 'FREE',
          userData: {
            value: 'Free Shipping',
          },
        },
        {
          id: 'asds-asd13-12312asd-2222',
          probability: 20,
          chanceReal: 20,
          type: 'string',
          value: '25% Discount Today',
          resultText: '25OFF',
          userData: {
            value: '25% Discount Today',
          },
        },
        {
          id: 'asds-asd13-12312asd-3333',
          probability: 20,
          chanceReal: 20,
          type: 'string',
          value: 'No Luck :(',
          resultText: 'NoLuck:(',
          userData: {
            value: 'No Luck :(',
          },
        },
      ],
      general_settings: {
        display_game: [
          {
            name: 'onEnter',
            startText: 'On entering the site',
            endText: '',
            checked: false,
            value: '',
            maxValue: 0,
          },
          {
            name: 'scroll',
            startText: 'User scrolls',
            endText: '% of the page',
            checked: true,
            value: 70,
            maxValue: 100,
          },
          {
            name: 'time',
            startText: 'After',
            endText: 'sec',
            checked: false,
            value: 3000,
            maxValue: 60,
          },
        ],
        interval: '4',
        interval_unit: 'hours',
        trigger_button: true,
        email_repeat: true,
        display_page: ['catalog'],
        is_display_page: true,
        send_on_email: false,
      },
      trigger_button: {
        title: 'Get a gift',
        bg_color: '#fff',
        text_color: '#000',
      },
    },
  };

  new PTW({
    accessKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFlOGFlMzJjNDM1MDZiNjQxN2IyOTgiLCJkb21haW4iOiJsb2NhbGhvc3QiLCJ0eXBlIjoiYWNjZXNzS2V5IiwiaWF0IjoxNzIyOTYxNTEyfQ.ErwQV1_65LegI8hfbJVMAZTihpppqK3US8VmvoNJ6ok',
    data: {
      params: PARAMS_DEFAULT,
      game: 'remember', // roulette, scratch, remember | isPreview = true | not request api
    },
    isPreview: false,
  });
};
