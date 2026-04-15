export default function ImageDisplay({ imageFile }) {
  const src = `${import.meta.env.BASE_URL}BaseImages/${imageFile}`

  return (
    <div className="bg-white rounded-2xl shadow-md p-3">
      <img
        src={src}
        alt={`Training document: ${imageFile}`}
        className="rounded-xl max-h-72 w-full object-contain"
      />
    </div>
  )
}
