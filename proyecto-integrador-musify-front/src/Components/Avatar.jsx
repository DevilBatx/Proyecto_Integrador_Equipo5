import React, {useContext } from 'react';
import { GlobalContext } from './Utils/GlobalContext';
import { createAvatarFromName } from './Utils/helpers';


const Avatar = () => {
  const { state } = useContext(GlobalContext);

  return (
    <div className="mt-8 mx-auto w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold text-lg">{createAvatarFromName(state.userReducer.user.name, state.userReducer.user.lastName)}</div>
  )
}

export default Avatar