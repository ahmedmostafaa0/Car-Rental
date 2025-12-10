import Title from "./Title";
import {motion} from 'motion/react'

const Newsletter = () => {
    
    return (
        <motion.div
            initial={{opacity: 0, y:30}}
            whileInView={{opacity: 1, y:0}}
            transition={{duration: .6, ease: 'easeOut'}}
            viewport={{once: true, amount:.3}}
        className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40">
            <motion.div
                initial={{opacity: 0, y:20}}
                whileInView={{opacity: 1, y:0}}
                transition={{duration: .5, delay: .2}}
             className="mb-12">
                <Title title='Never Miss a Deal!' subTitle='Subscribe to get the latest offers, new collections, and exclusive discounts.' />
            </motion.div>
            <motion.form 
            initial={{opacity: 0, y:20}}
            whileInView={{opacity: 1, y:0}}
            transition={{duration: .5, delay: .4}}
            className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input
                    className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                    type="text"
                    placeholder="Enter your email address"
                    required
                />
                <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none">
                    Subscribe
                </button>
            </motion.form>
        </motion.div>
    )
}

export default Newsletter;
