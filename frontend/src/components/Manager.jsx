import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()

    const [form, setform] = useState({ site: "", username: "", password: "" })

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        let passwordArray;

        setPasswordArray(passwords)

    }


    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        getPasswords()


    }, [])

    const copyText = (text) => {
        // alert("Copied to Clipboard : " + text)
        toast('😎 Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }
    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
          // If it's an edit (has an ID), delete the old version first
          if (form.id) {
            await fetch("http://localhost:3000/", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: form.id })
            });
          }
      
          // Create a new ID (only once)
          const newEntry = { ...form, id: uuidv4() };
      
          setPasswordArray([...passwordArray, newEntry]);
      
          await fetch("http://localhost:3000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntry)
          });
      
          setform({ site: "", username: "", password: "" });

            toast('Saved Successfully! ⌛✅', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
        else {
            toast('Give details correctly! ERROR! NOT SAVED ⌛❌', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
    }

    const deletePassword = async(id) => {
        console.log("Deleting password with id", id)
        let ask = confirm("Do you really want to delete this")
        if (ask) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            let res=await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type": "application/json"}, body: JSON.stringify({id})})
            toast('Deleted Successfully! 🗑 ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
    }
    const editPassword = (id) => {
        console.log("Editing password with id", id)
        setform({...passwordArray.filter(i => i.id === id)[0], id: id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))

        toast('Now Editing! 📝✂', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    const showPassword = () => {

        if (ref.current.src.includes("icons/hidden.png")) {
            alert("Hiding the Password")
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            alert("Showing the Password")
            ref.current.src = "icons/hidden.png"
            passwordRef.current.type = "text"
        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            <div className="bg-purple-200">
                <div className="md:mx-auto  md:max-w-4xl rounded-lg md:px-30 md:py-8 p-2">
                    <h1 className='text-4xl font-bold text-center text-purple-900'><span className='text-purple-600'>&lt;</span>
                        Password Manager
                        <span className='text-purple-600'>/&gt;</span></h1>
                    <p className='text-purple-600 text-lg text-center'>Your own Password Manager Website</p>

                    <div className="text-black flex flex-col p-4 gap-8 items-center">
                        <input value={form.site} onChange={handleChange} className="rounded-full bg-white border border-purple-500 w-full px-4 py-1" type="text" name="site" id="site" placeholder='Enter Website URL' />
                        <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
                            <input value={form.username} onChange={handleChange} className="rounded-full bg-white border border-purple-500 w-full px-4 py-1" type="text" name="username" id="username" placeholder='Enter Username' />
                            <div className="relative">
                                <input ref={passwordRef} value={form.password} onChange={handleChange} className="rounded-full bg-white border border-purple-500 w-full px-4 py-1" type="password" name="password" id="password" placeholder='Enter Password' />
                                <span className='absolute right-0 top-0'><img ref={ref} src="icons/eye.png" alt="show" width={20} className='mx-2 my-2 cursor-pointer' onClick={showPassword} /></span>
                            </div>
                        </div>
                        <button className='flex justify-center items-center bg-purple-500 rounded-full px-10 py-2 w-fit hover:bg-purple-600 hover:cursor-pointer text-white font-bold border-2 border-purple-700' onClick={savePassword}>Save </button>
                    </div>
                </div>
            </div>
            <div className="passwords bg-purple-200">
                <h2 className="font-bold text-2xl py-4 bg-purple-200">Your Passwords :</h2>
                {passwordArray.length === 0 && <div>No passwords to show</div>}
                {passwordArray.length != 0 && <table className='table-auto w-full rounded-md overflow-hidden  bg-purple-200'>
                    <thead className='bg-purple-500 text-white'>
                        <tr>
                            <th className='py-2'>Site</th>
                            <th className="py-2">Username</th>
                            <th className="py-2">Password</th>
                            <th className='py-2'>Actions</th></tr></thead>
                    <tbody className="bg-purple-400  text-white font-serif">
                        {passwordArray.map((item, index) => {
                            return <tr key={index}>
                                <td className=" py-2 border border-white text-center w-32"><a href={item.site} target='blank'>{item.site}</a>
                                    <img onClick={() => { copyText(item.site) }} className=' invert cursor-pointer px-5' src="/icons/copy.png" alt="" /></td>
                                <td className="py-2 border border-white text-center w-32">{item.username} <img onClick={() => { copyText(item.username) }} className='invert cursor-pointer px-5' src="/icons/copy.png" alt="" /></td>
                                <td className="py-2 border border-white text-center w-32">{"*".repeat(item.password.length)} <img onClick={() => { copyText(item.password) }} className='invert cursor-pointer px-5' src="/icons/copy.png" alt="" /></td>
                                <td className="py-2 border border-white text-center w-10 ">
                                    <div className='flex items-center justify-center gap-5'>              <span><img className='w-7 invert cursor-pointer' src="/icons/edit.svg"
                                        alt=""
                                        onClick={() => { editPassword(item.id) }} /></span>
                                        <span><img className='invert w-6 cursor-pointer' onClick={() => { deletePassword(item.id) }} src="/icons/delete.png" alt="" /></span>
                                    </div>              </td>
                            </tr>
                        })}
                    </tbody></table>}
                <div><br></br></div>
            </div>
        </>
    )
}

export default Manager