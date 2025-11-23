import { ErrorMessage, Field, Form, Formik} from "formik"
import Modal from "./Modal"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { toast } from "react-toastify"
import * as Yup from "yup"

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Required field"),
    email: Yup.string().email("Invalid Email").required("Required field")
})

const AddAndUpdateContact = ({isOpen, onClose, isUpdate, contact}) => {
    const addContact = async (contact) =>{
        try{
            const contactRef = collection(db, "contacts")
            await addDoc(contactRef, contact)
            onClose()
            toast.success("Contact Added Succesfully")
        } catch (error){
            console.log(error)
        }
    }
    const updateContact = async (contact, id) =>{
        try{
            const contactRef = doc(db, "contacts", id)
            await updateDoc(contactRef, contact)
            onClose()
            toast.success("Contact Updated Succesfully")
        } catch (error){
            console.log(error)
        }
    }

  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose}>
            <Formik validationSchema={contactSchemaValidation}
              initialValues={isUpdate ? {name: contact.name, email: contact.email ,} : {name:"", email:"",}} 
              onSubmit={(values) => {isUpdate ? updateContact(values, contact.id) : addContact(values)}}>
                <Form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name</label>
                        <Field name="name" className="p-3 h-10 border"/>
                        <div className="text-xs font-bold text-red-500">
                            <ErrorMessage name="name"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <Field name="email" className="p-3 h-10 border"/>
                        <div className="text-xs font-bold text-red-500">
                            <ErrorMessage name="email"/>
                        </div>
                    </div>
                    <button className="bg-orange px-3 py-1.5 self-end rounded border border-orange shadow-xl/60 shadow-orange cursor-pointer font-semibold">{isUpdate ? "Update" : "Add"} Contact</button>
                </Form>
            </Formik>
        </Modal>
    </div>
  )
}

export default AddAndUpdateContact