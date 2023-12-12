import Link from 'next/link'
import classes from './index.module.scss'
import { Category } from '../../../payload/payload-types'
import CategoryCard from './CategorieCard'

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Categorii de Servicii</h3>
        <Link href="/products" className={classes.showAll}>
          Arata Tot
        </Link>
      </div>
      <ul>
        <li className={classes.list}>
          {categories &&
            categories.map(category => {
              return <CategoryCard key={category.id} category={category} />
            })}
        </li>
      </ul>
    </section>
  )
}

export default Categories
