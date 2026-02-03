import GameOfTheWeek from '@/app/components/GameOfTheWeek';
import Trending from '../../components/Trending';
import NewReleases from '@/app/components/NewReleases';
import PopularWeek from '@/app/components/PopularWeek';
import HomeSwiper from '../../components/HomeSwiper'
import BrowseByGenre from '@/app/components/BrowseByGenre';
import ComingSoon from '@/app/components/ComingSoon';
import GameStats from '@/app/components/GameStats';
export default function page() {
  return (
    <main className="container mx-auto px-4 py-20 md:py-0">
        <HomeSwiper />
        <Trending />
        <BrowseByGenre />
        <NewReleases />
        <GameOfTheWeek />
        <GameStats />
        <PopularWeek />
        <ComingSoon />
    </main>
  )
}
