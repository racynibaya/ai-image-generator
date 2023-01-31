import { useState, useEffect } from 'react';

import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  console.log(data);
  if (data?.length > 0) {
    return data.map((post, i) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  console.log(allPost);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:9000/api/v1/post');

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setAllPost(result.data.reverse());
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = e => {
    clearTimeout(setTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPost.filter(
          item =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          The Community Showcase
        </h1>
        <p className='mt-2 text-[#666e75] text-[14px]  max-w-[500px]'>
          Browse throug a collection of imaginative and visually stunning images
          generated by DALL-E AI
        </p>
      </div>
      <div className='mt-16'>
        <FormField
          labelName='Search Posts'
          type='text'
          name='text'
          placeholder='Search posts'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for{' '}
                <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}

            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-3'>
              {searchText ? (
                <RenderCards data={searchedResults} title='No search found' />
              ) : (
                <RenderCards data={allPost} title='No post found' />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
