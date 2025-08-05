import Navbar from "./components/Navbar"
import { FiSearch } from "react-icons/fi"
import { AiFillPlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "./config/firebase"
import { ToastContainer } from 'react-toastify';
import ContactCard from "./components/ContactCard"
import AddAndUpdateContact from "./components/AddAndUpdateContact"
import useDisclouse from "./hooks/useDisclouse"
import NotFoundContact from "./components/NotFoundContact"

const App = () => {

  const [contacts, setContacts] = useState([])
  const { isOpen, onClose, onOpen } = useDisclouse()

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts")
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
          setContacts(contactLists)
          return contactLists
        })
      } catch (error) {
        console.log(error)
      }
    }
    getContacts()
  }, [])

  const filterContacts = (e) => {
    const value = e.target.value
    const contactsRef = collection(db, "contacts")
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
      const filteredContacts = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))
      setContacts(filteredContacts)
      return filteredContacts
    })
  }

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="ml-1 text-3xl text-white absolute" />
            <input onChange={filterContacts} type="text" className="bg-transparent border border-white rounded-md h-10 flex-grow text-white pl-9" />
          </div>
          <AiFillPlusCircle onClick={onOpen} className="text-5xl text-white cursor-pointer" />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {contacts.length <= 0 ? <NotFoundContact /> : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
        <div className="fixed bottom-2 left-2 text-[14px] text-white">--Made by <a className="font-bold text-purple-500" href="https://www.linkedin.com/in/adarshgupta04">@adarshgupta</a></div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  )
}

export default App