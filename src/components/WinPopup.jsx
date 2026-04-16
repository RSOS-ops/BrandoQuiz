export default function WinPopup({ image, onDismiss }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 cursor-pointer"
      onClick={onDismiss}
    >
      <img
        src={image}
        alt=""
        className="w-[640px] h-[640px] max-w-[90vw] max-h-[90vh] object-contain"
      />
    </div>
  )
}
