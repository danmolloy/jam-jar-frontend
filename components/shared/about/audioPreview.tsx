'use client'

import { DateTime } from "luxon";
import { useState } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";


type AudioPreviewProps = {
  recordings: {
    id: string;
    title: string;
    location: string;
    notes: string;
    tags: string[]
    date: string
  }[]
}

export default function AudioPreview(props: AudioPreviewProps) {
  const { recordings } = props;
  return (
    <div className="bg-white mx-8 shadow">
      {recordings.map((i) => (
                  <div
                    key={i.id}
                    className="text-sm border-b border-gray-300 transition-all duration-700"
                  >
                    <button
                      onClick={() => {}}
                      className="p-1 w-full hover:cursor-pointer"
                    >
                      <p className="font-medium text-base text-start">{i.title}</p>
                      <div className="flex flex-row justify-between items-center ">
                        <div className="flex flex-row items-center">
                          <CiCalendarDate className="mr-1"/>
                          <p>{DateTime.fromISO(i.date).toFormat('dd LLL yyyy')}</p>
                        </div>
                        <div className="flex flex-row items-center">
                          <FaLocationPin className="mx-1"/>
                          <p>{i.location}</p>
                        </div>
                      </div>
                    </button>
                    
                      <div className="mx-1 flex flex-col">
                        <p className="p-1">{i.notes}</p>
                        <div>{i.tags?.map((j, index) => <p key={index}>{j}</p>)}</div>
                        <audio className="p-2 self-center" controls/>
                      </div>
                    
                  </div>
                ))}
    </div>
  )
}