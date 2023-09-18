import create  from "zustand";
import {useLoginStore} from './loginStore.js';
import {useSignupStore} from './signupStore.js';
import {useAddBlogStore} from './addBlogStore.js'
import {useBlogStore} from './blogStore.js'

export const useBoundStore = create((...a) => ({
  ...useLoginStore(...a),
  ...useSignupStore(...a),
  ...useAddBlogStore(...a),
  ...useBlogStore(...a),
}));






