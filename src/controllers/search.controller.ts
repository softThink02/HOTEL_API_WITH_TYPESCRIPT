import Rooms from "../models/room";

interface IQueryProps {
  search?: string;
  roomType?: string;
  minPrice?: string;
  maxPrice?: string
}

const getFilteredRooms = async (queries: IQueryProps) => {
  const { search, roomType, minPrice, maxPrice } = queries;

  try {
    /**
     * Check if the search query isn't properly constructed
     */
    // if (search === undefined) {
    //   throw new Error(
    //     "No search queries provided"
    //   );
    // }

    const matchedRooms = await Rooms.find(
      {
        $or: [
          { name: { $regex: search ? search : "", $options: "i" } },
          { price: { "$gte": minPrice, "$lte": maxPrice } }
        ],
      },
      undefined,
      { populate: { path: "roomType", options: { strict: false } } }
    )
      .limit(10)
      .lean();

    return { data: matchedRooms };
  } catch (err) {
    throw err
  }
};

export default getFilteredRooms