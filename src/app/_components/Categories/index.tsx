/* eslint-disable prettier/prettier */
import Link from 'next/link'
import classes from './index.module.scss'
import { Category } from '../../../payload/payload-types'
import CategoryCard from './CategorieCard'

const Categories = ({ categories }: { categories: Category[] }) => {
    return (
      <section className={classes.container}>
        <div className={classes.titleWrapper}>
          <h3>Shop by Categories</h3>
          <Link href="/products">Show All</Link>
        </div>
  
        <div className={classes.list}>
          {categories.map(category => {
            return <CategoryCard key={category.id} category={category} />
          })}
        </div>
      </section>
    )
  }

export default Categories
