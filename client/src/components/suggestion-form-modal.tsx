
import React, { useState } from 'react';

import {

  Dialog,

  DialogContent,

  DialogHeader,

  DialogTitle,

  DialogDescription,

  DialogFooter,

} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';

import { Button } from '@/components/ui/button';

import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

import { toast } from 'sonner';



interface StarRatingProps {

  rating: number;

  setRating: (rating: number) => void;

}



const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {

  const [hover, setHover] = useState(0);



  return (

    <div className="flex justify-center space-x-1">

      {[...Array(5)].map((_, index) => {

        const starValue = index + 1;

        return (

          <button

            type="button"

            key={starValue}

            className="focus:outline-none"

            onClick={() => setRating(starValue)}

            onMouseEnter={() => setHover(starValue)}

            onMouseLeave={() => setHover(0)}

          >

            <Star

              className={cn(

                'h-8 w-8 transition-colors',

                starValue <= (hover || rating)

                  ? 'text-yellow-400 fill-yellow-400'

                  : 'text-gray-400 fill-transparent'

              )}

            />

          </button>

        );

      })}

    </div>

  );

};



interface SuggestionFormModalProps {

  isOpen: boolean;

  onClose: () => void;

}



export const SuggestionFormModal: React.FC<SuggestionFormModalProps> = ({ isOpen, onClose }) => {

  const [name, setName] = useState('');

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState('');

  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async () => {

    if (rating === 0 || comment.trim() === '') {

      toast.error('Please provide a rating and a comment.');

      return;

    }



    setIsLoading(true);

    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/suggestions`, {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

        },

        body: JSON.stringify({ name: name.trim() || undefined, rating, comment }),

      });



      const data = await response.json();



      if (!response.ok) {

        throw new Error(data.msg || 'Something went wrong');

      }



      toast.success('Thank you for your feedback!');

      setName('');

      setRating(0);

      setComment('');

      onClose();

    } catch (error) {

      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

      toast.error(errorMessage);

    } finally {

      setIsLoading(false);

    }

  };



  return (

    <Dialog open={isOpen} onOpenChange={onClose}>

      <DialogContent className="sm:max-w-[425px] bg-black/50 backdrop-blur-sm border-neutral-700 text-white">

        <DialogHeader>

          <DialogTitle className="text-center text-2xl font-bold">Share Your Feedback</DialogTitle>

          <DialogDescription className="text-center">

            Help us improve Nexus. We'd love to hear what you think!

          </DialogDescription>

        </DialogHeader>

        <div className="grid gap-6 py-4">

          <div className="grid grid-cols-4 items-center gap-4">

            <Input

              id="name"

              placeholder="Your Name (Optional)"

              value={name}

              onChange={(e) => setName(e.target.value)}

              className="col-span-4 bg-slate-800/50 border-gray-500 focus:ring-gray-500"

              disabled={isLoading}

            />

          </div>

          <div className="grid gap-2">

            <StarRating rating={rating} setRating={setRating} />

          </div>

          <div className="grid grid-cols-4 items-center gap-4">

            <Textarea

              id="comment"

              placeholder="Tell us what you liked or what could be better..."

              value={comment}

              onChange={(e) => setComment(e.target.value)}

              className="col-span-4 h-28 bg-slate-800/50 border-gray-500 focus:ring-gray-500 text-sm placeholder-gray-500"

              disabled={isLoading}

            />

          </div>

        </div>

        <DialogFooter>

          <Button type="submit" onClick={handleSubmit} className="w-full bg-white text-black hover:bg-gray-200" disabled={isLoading}>

            {isLoading ? 'Submitting...' : 'Submit Feedback'}

          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

};


