const NotFoundContact = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[65vh] gap-2">
        <div>
            <img src="./contact.png"/>
        </div>
        <h3 className="text-white text-2xl font-semibold">No Contacts</h3>
    </div>
  )
}

export default NotFoundContact