import React from 'react';
import '../scss/pages/homepage.scss';
import twoPhone from '../img/two_phone.png'
import Apple from '../img/badge_app_store_fr.svg'
import PlayStore from '../img/badge_google_play_fr.svg'
import Gallery from '../img/badge_app_gallery_fr.svg'
import Rating from '../img/rating-stars-five.svg'
import Choice from '../img/editors-choice.svg'
import Friend from '../img/friends-key-values.jpg'


const HomePage = () => {

  return (
    <section className='home'>
        <div className='home_intro'>
            <div className='home_intro__content'>
                <div className='home_intro__content_left'>
                    <div className='home_intro__content_left_title'>
                        <h1>Gérez les dépenses avec vos voisins</h1>
                    </div>
                    <div className='home_intro__content_left_desc'>
                        <p>L’application idéale et gratuite pour les voyages, les activités et tous les moments partagés</p>
                    </div>
                    <div className='home_intro__content_left_picto'>
                        
                        <img src={Apple} alt="Logo pour télécharger sur Apple"/>
                        <img src={PlayStore} alt="Logo pour télécharger sur Play Store"/>
                        <img src={Gallery} alt="Logo pour télécharger sur Gallery"/>
                    </div>
                </div>
                <div className='home_intro__content_right'>
                    <div className='home_intro__content_right_img'>
                        <img src={twoPhone} alt="Smartphones avec l'application"/>
                    </div>
                    <div className='home_intro__content_right_bottom'>
                        <div className='rating'>
                            <img src={Rating} alt="Étoile d'évaluation"/>
                            <p>Noté 4.8/5 dans l’App Store</p>
                        </div>
                        <div className='editor-choice'>
                            <img src={Choice} alt="Choix de l'éditeur"/>
                            <p>Choix de l’éditeur dans Google Play</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='keyvalue'>
            <div className='keyvalue_content'>
                <div className='keyvalue_content__left'>
                    <div className='keyvalue_content__left_group'>
                        <div className='title'>
                            <h2>Intuitif</h2>
                        </div>
                        <div className='text'>
                            <p>Tricount gère les comptes à plusieurs de manière simple et efficace. Insérez vos dépenses dans une interface intuitive et Tricount fait les calculs pour vous !</p>
                        </div>
                    </div>
                    <div className='keyvalue_content__left_group'>
                        <div className='title'>
                            <h2>Transparent</h2>
                        </div>
                        <div className='text'>
                            <p>Rien n’est caché, chaque participant peut ajouter ses propres dépenses et voir celles ajoutées par les autres</p>
                        </div>
                        
                    </div>
                    <div className='keyvalue_content__left_group'>
                        <div className='title'>
                            <h2>Social</h2>
                        </div>
                        <div className='text'>
                            <p>Tricount vous rapproche de vos amis, de vos colocataires et de votre famille lorsque vous gérez vos dépenses ensemble</p>
                        </div>
                    </div>
                </div>
                <div className='keyvalue_content__right'>
                    <img src={Friend} alt=""/>
                </div>
                
            </div>
            
        </div>
        
      
    </section>
  );
};

export default HomePage;
