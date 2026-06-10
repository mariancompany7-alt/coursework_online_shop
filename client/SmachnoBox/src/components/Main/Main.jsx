import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../products/ProductCard/Card';
import styles from './Main.module.css';

function Main({ plans }) {
  // Стани для модальних вікон (з попередніх кроків)
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Стани для фільтрів, пошуку та пагінації
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('Всі');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Кількість карток на одній сторінці (поставив 3, щоб ти відразу побачив пагінацію)

  // 1. Динамічно отримуємо всі унікальні теги з боксів для випадаючого списку
  const allTags = useMemo(() => {
    if (!plans) return ['Всі'];
    const tags = plans.flatMap(p => p.tags || []);
    return ['Всі', ...new Set(tags)];
  }, [plans]);

  // 2. Логіка пошуку, фільтрації та сортування
  const processedPlans = useMemo(() => {
    if (!plans) return [];
    let result = [...plans];

    // Пошук (за назвою, описом або назвою інгредієнта всередині боксу)
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(box =>
        box.title.toLowerCase().includes(lowerTerm) ||
        box.description.toLowerCase().includes(lowerTerm) ||
        (box.ingredients && box.ingredients.some(ing => ing.name.toLowerCase().includes(lowerTerm)))
      );
    }

    // Фільтрація за властивістю (тегом)
    if (filterTag !== 'Всі') {
      result = result.filter(box => box.tags && box.tags.includes(filterTag));
    }

    // Сортування
    if (sortBy === 'price_asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [plans, searchTerm, filterTag, sortBy]);

  // 3. Пагінація (розрізаємо масив на сторінки)
  const totalPages = Math.ceil(processedPlans.length / itemsPerPage);
  const paginatedPlans = processedPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Функції для скидання сторінки на 1 при будь-якій зміні фільтрів
  const handleSearch = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
  const handleFilter = (e) => { setFilterTag(e.target.value); setCurrentPage(1); };
  const handleSort = (e) => { setSortBy(e.target.value); setCurrentPage(1); };

  if (!plans || !Array.isArray(plans)) return <p style={{ textAlign: 'center', color: '#fff' }}>Завантаження планів...</p>;

  return (
    <div className={styles['main-wrapper']}>
      <section className={styles.mealPlans}>
        <div className={styles['section-header']}>
          <h1>Ексклюзивне меню здорового харчування</h1>
          <p>Збалансовані бокси з відбірних інгредієнтів. Оберіть свій ідеальний набір на кожен день</p>
        </div>

        {/* Панель керування: Пошук, Фільтр, Сортування */}
        <div className={styles.controlsContainer}>
          <input
            type="text"
            placeholder="Введіть назву боксу вбо страви"
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />

          <div className={styles.filtersWrapper}>
            <select value={filterTag} onChange={handleFilter} className={styles.selectInput}>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag === 'Всі' ? 'Усі категорії' : tag}</option>
              ))}
            </select>

            <select value={sortBy} onChange={handleSort} className={styles.selectInput}>
              <option value="default">За замовчуванням</option>
              <option value="price_asc">Від найдешевших</option>
              <option value="price_desc">Від найдорожчих</option>
            </select>
          </div>
        </div>

        {/* Сітка карток */}
        <div className={styles['cards-grid']}>
          {paginatedPlans.length > 0 ? (
            paginatedPlans.map((plan) => (
              <Card
                key={plan._id}
                boxData={plan}
                onRequireAuth={() => setShowAuthModal(true)}
                onAdminWarning={() => setShowAdminModal(true)}
              />
            ))
          ) : (
            <p className={styles.noResults}>За вашим запитом нічого не знайдено :(</p>
          )}
        </div>

        {/* Пагінація (відображається тільки якщо сторінок більше ніж 1) */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              &laquo; Попередня
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePage : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className={styles.pageBtn}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Наступна &raquo;
            </button>
          </div>
        )}
      </section>

      {/* --- Модальні вікна (залишаються без змін) --- */}
      {showAuthModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAuthModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}></div>
            <h2>Потрібна авторизація</h2>
            <p>Щоб оформити замовлення та відстежувати його статус, будь ласка, увійдіть у свій акаунт.</p>
            <div className={styles.modalActions}>
              <Link to="/login" className={styles.loginBtn}>Увійти в акаунт</Link>
              <button onClick={() => setShowAuthModal(false)} className={styles.closeBtn}>Продовжити перегляд</button>
            </div>
          </div>
        </div>
      )}

      {showAdminModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAdminModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}></div>
            <h2>Доступ обмежено</h2>
            <p>Адміністратори не можуть створювати клієнтські замовлення. Увійдіть як звичайний покупець, щоб оформити покупку.</p>
            <div className={styles.modalActions}>
              <button onClick={() => setShowAdminModal(false)} className={styles.closeBtn} style={{ backgroundColor: '#444', color: '#fff' }}>Зрозуміло</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;