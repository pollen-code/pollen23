import { createAppContainer, Navigation } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import {Animated} from 'react-native';

// load page
import load_page from './source/load_page';
import signup_login from './source/signup_login';
import login from './source/login';

// signup 
import signup from './source/signup';
import signup_phone_var from './source/signup_phone_var';
import profile_setup_1 from './source/profile_setup_1';
import profile_setup_2 from './source/profile_setup_2';
import thank_you from './source/thank_you';

// forgot password
import forgot_password from './source/forgot_password';
import forgot_password1 from './source/forgot_password1';
import forgot_password2 from './source/forgot_password2';
import forgot_password3 from './source/forgot_password3';

// feed / comments
import feed from './source/feed';
import view_comment from './source/view_comment';
import create_post from './source/create_post';
import create_comment from './source/create_comment';

// messages
import private_message from './source/private_message';
import private_message_settings from './source/private_message_settings';
import view_message from './source/view_message';
import new_message from './source/new_message';
import message_settings from './source/message_settings';
import create_message from './source/create_message';
import choose_text_color from './source/choose_text_color';
import add_ from './source/add_';

// profile
import profile from './source/profile';
import view_comment_profile from './source/view_comment_profile';
import external_view_profile from './source/external_view_profile';
import modify_profile from './source/modify_profile';
import blocked_users from './source/blocked_users';
import following from './source/following';
import followers from './source/followers';
import saved_posts from './source/saved_posts';
import report from './source/report';
import license_agreement from './source/license_agreement';

// rooms
import create_room from './source/create_room';
import create_room2 from './source/create_room2';
import create_room3 from './source/create_room3';
import create_room4 from './source/create_room4';
import rooms from './source/rooms';
import rooms_settings from './source/rooms_settings';
import add_room from './source/add_room';
import room_preview from './source/room_preview';
import request_access from './source/request_access';
import view_room from './source/view_room';
import room_message_settings from './source/room_message_settings';
import admin_room from './source/admin_room';
import searched_messages_rooms from './source/searched_messages_rooms';

// settings
import how_it_works from './source/how_it_works';
import help_menu from './source/help_menu';
import settings from './source/settings';
import advanced from './source/advanced';
import feedback from './source/feedback';
import account_details from './source/account_details';
import account_status from './source/account_status';
import account_prestatus from './source/account_prestatus';

// policies
import privacy_policy from './source/privacy_policy';
import safety from './source/safety';
import terms_of_service from './source/terms_of_service';

// trial
import trial from './source/trial'

const AppNavigator = createStackNavigator(
  {
    initialRoute: load_page,

    // trial
    TRIAL: {screen:trial},
    
    // load page 
    LOAD_PAGE: {screen:load_page},  
    SIGNUP_LOGIN: {screen:signup_login},
    LOGIN: {screen:login},

    // signup 
    SIGNUP: {screen:signup},  
    SIGNUP_PHONE_VAR: {screen:signup_phone_var},  
    PROFILE_SETUP_1: {screen:profile_setup_1},
    PROFILE_SETUP_2: {screen:profile_setup_2},
    THANK_YOU: {screen:thank_you},
    
    // forgot password
    FORGOT_PASSWORD: {screen:forgot_password},
    FORGOT_PASSWORD1: {screen:forgot_password1},
    FORGOT_PASSWORD2: {screen:forgot_password2},
    FORGOT_PASSWORD3: {screen:forgot_password3},  
    
    // feed / comments
    FEED: {screen:feed},  
    VIEW_COMMENT: {screen:view_comment},
    CREATE_POST: {screen:create_post},
    CREATE_COMMENT: {screen:create_comment}, 
    
    // messages
    PRIVATE_MESSAGE: {screen:private_message}, 
    PRIVATE_MESSAGE_SETTINGS: {screen:private_message_settings}, 
    VIEW_MESSAGE: {screen:view_message}, 
    NEW_MESSAGE: {screen:new_message}, 
    MESSAGE_SETTINGS: {screen:message_settings}, 
    CREATE_MESSAGE: {screen:create_message}, 
    CHOOSE_TEXT_COLOR: {screen:choose_text_color},
    ADD_: {screen:add_},
    
    // profile
    PROFILE: {screen:profile}, 
    SETTINGS: {screen:settings}, 
    FOLLOWERS: {screen:followers}, 
    FOLLOWING: {screen:following},
    SAVED_POSTS: {screen:saved_posts}, 
    VIEW_COMMENT_PROFILE: {screen:view_comment_profile}, 
    EXTERNAL_VIEW_PROFILE: {screen:external_view_profile},
    MODIFY_PROFILE: {screen:modify_profile},   
    BLOCKED_USERS: {screen:blocked_users}, 
    REPORT: {screen:report},
    LICENSE_AGREEMENT: {screen:license_agreement},
    
    // settings
    FEEDBACK: {screen:feedback}, 
    ADVANCED: {screen:advanced}, 
    HOW_IT_WORKS: {screen:how_it_works}, 
    HELP_MENU: {screen:help_menu}, 
    ACCOUNT_DETAILS: {screen:account_details}, 
    ACCOUNT_STATUS: {screen:account_status}, 
    ACCOUNT_PRESTATUS: {screen:account_prestatus}, 
    
    // policies 
    SAFETY: {screen:safety}, 
    TERMS_OF_SERVICE: {screen:terms_of_service},
    PRIVACY_POLICY: {screen:privacy_policy},
    
    // rooms
    CREATE_ROOM: {screen:create_room},
    CREATE_ROOM2: {screen:create_room2},
    CREATE_ROOM3: {screen:create_room3},
    CREATE_ROOM4: {screen:create_room4},
    ROOMS: {screen:rooms},
    ROOM_PREVIEW: {screen:room_preview},
    VIEW_ROOM: {screen:view_room},
    ROOMS_SETTINGS: {screen:rooms_settings},
    REQUEST_ACCESS: {screen:request_access},
    ROOM_MESSAGE_SETTINGS: {screen:room_message_settings},
    ADMIN_ROOM: {screen:admin_room}, 
    SEARCHED_MESSAGES_ROOMS: {screen:searched_messages_rooms},
    ADD_ROOM: {screen:add_room}, 
  },

  // transitions
  {
    headerMode:'screen',
    mode:'none',
    defaultNavigationOptions: {gesturesEnabled:false,}, 
    transitionConfig: () => ({transitionSpec: {duration: 0,timing: Animated.timing}})
  },
);

export default createAppContainer(AppNavigator);