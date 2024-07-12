import * as React from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RatingStar from './Rating';
import { addReview } from '../redux/review/review.action';

export default function ReviewModal({ open, setOpen, order }) {
  const [value, setValue] = React.useState(2);
  const [text, setText] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      message: text,
      rating: value,
      provider: order.provider,
      user: order.user
    };
    dispatch(addReview(data));
    setText("");
    setValue(2);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="transition-transform duration-300 ease-in-out">
      <DialogTitle className="text-2xl font-bold text-center text-gray-700">Add Your Review</DialogTitle>
      <hr className="border-t-2 border-gray-200 my-2" />
      <form onSubmit={handleSubmit} className="px-4">
        <DialogContent>
          <div className="flex flex-col gap-4 py-2">
            <label htmlFor="rating" className="font-semibold text-lg">Select Rating</label>
            <RatingStar id="rating" value={value} setValue={setValue} />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="review" className="font-semibold text-lg">Your Review</label>
            <textarea
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 py-2 rounded-md shadow-sm transition-all duration-300 ease-in-out"
              rows={5}
              cols={50}
              placeholder="Enter Your Review"
              id="review"
              value={text}
              required
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full justify-end pt-4">
            <button
              onClick={handleClose}
              className="text-white bg-red-500 px-3 py-2 rounded-md shadow-md hover:bg-red-600 transition-transform duration-300 ease-in-out"
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Submit"
              className="text-white bg-blue-600 px-3 py-2 rounded-md shadow-md hover:bg-blue-700 transition-transform duration-300 ease-in-out cursor-pointer"
            />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
