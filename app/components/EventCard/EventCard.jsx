import { Button } from "@/components/ui/button"

export default function EventCard({ event }) {
  return (
  <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <div className="md:flex">
      <div className="md:flex-shrink-0">
        <img
          className="h-48 w-full object-cover md:w-48"
          src={event.image} 
          alt="Event Image"
        />
      </div>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
        <p className="text-gray-600 mb-2">{event.date} - {event.location}</p>
        <p className="text-gray-700">{event.description}</p>
        <div className="mt-4">
          <Button>Register</Button>
        </div>
      </div>
    </div>
  </div>
  )
}
