'use client'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from "axios";
import { IoIosArrowRoundForward } from 'react-icons/io';

export default function Contact() {
  const [sendStatus, setSendStatus] = useState<"success"|"sending"|"err"|null>(null)

  const sendFail = (<div><h2 className="text-2xl">Message failed to send.</h2> <p>Please try again or <a href='mailto:danielmolloy_6@icloud.com' className='text-blue-500'>send an email</a>.</p></div>)

  const sendSuccess = (<div><h2 className="text-2xl">Message recieved!</h2><p>I will get back to you as soon as possible.</p></div>)

  const sendingMsg = (<div><h2 className="text-2xl">Message sending...</h2></div>)

  return (
    <section id="contact" className="flex flex-col w-screen justify-start items-center p-4 py-16 text-sm min-h-[90vh] bg-neutral-100 border-t">

      <h1 className='font-semibold font-mono text-4xl self-start'>CONTACT</h1>
    <Formik    
    initialValues={{
      name: '',
      email: '',
      message: '',
    }}
    validationSchema={Yup.object({
      name: Yup.string()
        .max(30, 'Must be 30 characters or less')
        .required('name required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('email required'),
      message: Yup.string()
        .max(500, 'Must be 200 characters or less')
        .required('message required')
    })}
    onSubmit={async (values, actions ) => {
      setSendStatus("sending")
      await new Promise(resolve => setTimeout(resolve, 1000))
      axios.post("/api/contact", values)
      .then((res) => {
        console.log('Response received')
        if (res.status === 201) {
          setSendStatus("success")
          actions.setSubmitting(false)
          actions.resetForm()
        } else {
          actions.setSubmitting(false)
          setSendStatus("err")
        }
        }).catch(() => {
          actions.setSubmitting(false)
          setSendStatus("err")
        })
      }}> 
      {(props) => (
      <Form data-testid="contact-form" className="z-10 mt-4 flex flex-col mx-4 w-screen self-center lg:w-1/2 ">

          <div className="flex flex-col m-2 ">
          <label htmlFor='name-input' className="form-label dark:text-zinc-400 ">NAME</label>
          <Field 
            id="name-input" 
            className=" text-dark border rounded border-dark bg-light  w-full p-1 dark:bg-zinc-300"
            type="text"
            name="name"/>
            <div className="h-6">
          <ErrorMessage name="name">
            { msg => <div className="text-sm text-red-500 h-6">{msg}</div> }
          </ErrorMessage>
          </div>
          </div>
          <div className="flex flex-col m-2">
          <label htmlFor='email' className="form-label dark:text-zinc-400 ">EMAIL</label>
          <Field
            id="email" 
            className="text-dark border rounded border-dark bg-light w-full p-1 dark:bg-zinc-300" 
            type="email"
            name="email"/>
            <div className="h-6">
          <ErrorMessage name="email" >
          { msg => <div className="text-sm text-red-500 h-6">{msg}</div> }
          </ErrorMessage>
          </div>
          </div>
          <div className="flex flex-col m-2 mb-0">
          <label htmlFor='msg-text' className="form-label dark:text-zinc-400 ">MESSAGE</label>
          <Field 
          multiline="6"
          maxLength="500"
          rows="4"
          component="textarea"
            id="msg-text" 
            className=" text-dark border border-dark bg-light rounded-sm w-full p-1 dark:bg-zinc-300"
            type="textarea"
            name="message"/>
            <div className="h-6">
            {props.values.message.length > 0 && <p className='self-center text-sm mx-2 opacity-40'>{`${props.values.message.length}/500`}</p>}

          <ErrorMessage name="message">
            { msg => <div className="text-sm text-red-500">{msg}</div> }
          </ErrorMessage>
          </div>
          </div>
        <button disabled={props.isSubmitting || (sendStatus === "sending")} id="submit-button" type='submit' className=" disabled:opacity-30 hover:underline hover:cursor-pointer flex flex-row m-2 p-1 w-20  border font-medium border-black self-end  text-sm">
          <p>SUBMIT</p>
          <IoIosArrowRoundForward size={20} />
        </button>
        <div>
        {sendStatus === "sending" 
        ? sendingMsg
        : sendStatus === "err" 
        ? sendFail
        : sendStatus === "success" 
        ? sendSuccess
        : null}
      </div>
      </Form> )}
    </Formik>
    
    </section>
  )
}