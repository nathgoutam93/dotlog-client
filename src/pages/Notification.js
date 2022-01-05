import React, { useEffect } from 'react';
import { useHeader } from '../context/headerContext';
import { useNavbar } from '../context/navbarContext';

export default function Notification() {

  const { setCustomHeader } = useHeader()
  const { setShow } = useNavbar();

  useEffect(()=>{
    const customHeader = <p className="flex-1 text-base font-bold dark:text-white">Notification</p>

    setCustomHeader(customHeader)
    setShow(true);
  },[setCustomHeader,setShow])

  return (
    <div className="w-full">
      <div>this is Notification</div>
    </div>
  );
}
