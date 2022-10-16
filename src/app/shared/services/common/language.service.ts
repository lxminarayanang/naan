import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public language: any = {};
  public type: boolean = true;
  tempLang: any;
  private _subject = new Subject<any>();

  newEvent(event: any) {
    this._subject.next(event);
  }

  get events$() {
    return this._subject.asObservable();
  }

  constructor(public service: CommonService) {
    debugger;
    this.tempLang = localStorage.getItem('language');
    if (this.tempLang) {
      this.changeLang('nochange');
    } else {
      this.changeLang();
    }
  }

  changeLang(change?: any) {
    debugger;
    if (!change) {
      this.type = this.type ? false : true;
    }
    localStorage.setItem('language', this.type ? 'tamil' : 'english');

    if (localStorage.getItem('language') === 'tamil') {
      window.document.title = 'நான் முதல்வன்';
      this.language = {
        survey:
          'சிறகை விரித்து பறக்க உன்னை அறிந்து கொள்ளுவது முக்கியம் சிந்தித்து இந்த கேள்விகளுக்கு விடை குடு',
        embalam: 'உயர்கல்வி வேலை வாய்ப்பு வழிகாட்டி',
        mainSubText: 'வாழ்க்கைப் பயணத்திற்கான',
        screenReader: 'திரை ஒலிக்க',
        password: 'கடவுச்சொல்',
        login: 'உள்நுழைய',
        deptSclEdu: 'பள்ளிக் கல்வித் துறை',
        govtOfTN: 'தமிழ்நாடு அரசு',
        ownedBy:
          'இந்த இணையதளத்தின் உள்ளடக்கம் தமிழ்நாடு பள்ளிக் கல்வித் துறையால் வடிவமைக்கப்பட்டு, உருவாக்கப்பட்டு நிருவகிக்கப்படுகிறது.',
        username: 'EMIS எண்',
        search: 'தேடு',
        entranceExam: 'நுழைவுத் தேர்வுகள்',
        courses: 'படிப்புகள்',
        educationLoans: 'கல்விக் கடன்',
        colleges: 'கல்லூரிகள்',
        scholarships: 'உதவித்தொகை',
        careers: 'வேலை வாய்ப்பு',
        explore: 'ஆராயுங்கள்',
        viewAll: 'அனைத்தையும் காட்டு',
        examBanner:
          'உங்கள் பலம் மற்றும் சாத்தியங்களை அறிந்து கொள்ள தயவுசெய்து இங்கே கிளிக் செய்யவும்',
        all: 'முழுவதும்',
        filter: 'Filters',
        clearFilter: 'Clear Filter',
        sortBy: 'Sort By',
        countText: 'அரசுப் பள்ளி மாணவர்கள் உயர்கல்வி பயில தயாராக உள்ளனர்.',
        countText2: 'அவர்தம் கனவு பயணத்திற்கு உறுதுணையாக உங்களுக்கு விருப்பமா?',
        makeChoice: 'தேர்ந்தெடுக்கவும்',
        beMentor: 'வழிகாட்டியாக',
        beSponsor: 'கொடையாளராக',
        signup: 'இணைக',
        offerScholarship: 'கல்வி உதவித்தொகை',
        scholarshipSubtext:
          'மாணவர்களின் உயர்கல்விக்கு உதவித்தொகை வழங்கும் நிறுவனமா?',
        registerNow: 'பதிவு செய்யுங்கள்',
        helpline: 'உயர்கல்வி ஆலோசனைக்கு உதவி எண்',
        helpline2: 'ஐ அழைக்கவும்',
        testimonialsLine1:
          'நான் அரசு எலைட் பள்ளியில் 2014-ம் ஆண்டு எனது பதினொன்றாம் வகுப்பை தொடர்ந்தேன். அப்பள்ளி ஆசிரியர்களின் ஊக்கமும், அறிவுரைகளும் என்னையும் எனது நண்பர்களையும் புத்துணர்வுடனும் ஆர்வமுடனும் உழைக்கச் செய்தது. இந்த ஊக்கத்தின் காரணமாக, 2015-ஆம் ஆண்டு மதுரை அரசு மருத்துவக் கல்லூரியில் சேர்ந்து எனது மருத்துவப் படிப்பை தொடர்ந்தேன்.',
        testimonialsLine2:
          '2021-ம் ஆண்டு எனது மருத்துவப் படிப்பை முடித்து, தற்போது மதுரை அரசு மருத்துவக் கல்லூரி மருத்துவமனையில் கோவிட் மருத்துவ அதிகாரியாக பணியாற்றி வருகிறேன்.',
        testimonialsName1: 'கிருஷ்ணவேணி,',
        testimonialsName2: 'அரசு பெண்கள் மேல்நிலைப்பள்ளி,பரமக்குடி',
        aboutVazhikaatti: 'நான் முதல்வன்',
        aboutVazhikaattiContent:
          '9 முதல் 12 ஆம் வகுப்பு  வரை பயிலும் மாணவர்களுக்கான உயர்கல்வி படிப்புகள் அவை தொடர்பான வேலை வாய்ப்புகள் பற்றிய தகவல்களை எளிதில் பெறும் வகையில் வழங்குவதே இந்த இணைய முகப்பின் நோக்கமாகும். மாணவர்களுக்கான நுழைவுத் தேர்வுகள், கல்வி உதவித்தொகை, கல்விக் கடன் குறித்த உடனடித் தகவல்களும் இங்கு கிடைக்கும்',
        aboutVazhikaattiContent2:
          'நான் முதல்வன் இணைய  முகப்பில் 2000க்கும் மேற்பட்ட கல்வி நிறுவனங்களும், இந்நிறுவனங்கள் வாயிலாக பெறக்கூடிய 300க்கும் மேற்பட்ட தொழில் சார்ந்த வழிகாட்டுதல்களும் அடங்கும். நாடு முழுவதும் உள்ள 150-க்கும் மேற்பட்ட உயர்கல்விக்கான உதவித் தொகைகளின் தகவல்களும் இந்த இணைய முகப்பில் உள்ளன. ',
        testimonialsHeading: 'நற்சான்றிதழ்',
        noOfVisits: 'பார்வையிட்டவர்கள்',
        bannerCareer: 'Tamil Text',
        bannerCareer1:
          'Sivaperuman was too shy to even speak to his classmates.',
        bannerCareer2:
          'His School classes were in English and he took time to adjust.',
        bannerCareer3:
          'He remembers his teachers who would teach well into the night too! He explored and discovered his interest in Space Science.',
        bannerCareer4:
          'Siva looked for higher education options and with the help of guidance from his mentors, joined Aerospace Engineering.',
        forHigherEdu: 'உயர் கல்விக்கு',
        forStudents: 'மாணவர்களுக்கு',
        beScholarship: 'நிறுவனங்கள்',
        subTextScholarship: 'கல்வி உதவி தொகை வழங்க',
        whatNew: 'புதியன',
        mentorFormTitle: 'வழிகாட்டி: பதிவு படிவம்',
        name: 'முழுப் பெயர்',
        email: 'மின்னஞ்சல்',
        mobileNumber: 'அலைபேசி எண்',
        dob: 'பிறந்த நாள்',
        address: 'வசிப்பிட முகவரி',
        pincode: 'அஞ்சல் குறியீட்டு எண்',
        submit: 'சமர்ப்பி',
        reset: 'மாற்றியமை',
        occupation: 'வகிக்கும் பதவி',
        interests: 'விருப்பம் மற்றும் சிறப்புத் தகுதிகள்',
        yearsofexp: 'பணி அனுபவ ஆண்டுகள்',
        preferedMentorSubtitle:
          'எந்தப் பள்ளியில் நீங்கள் செதுக்குநராக விரும்புகிறீர்கள்?',
        state: 'மாநிலம்',
        block: 'வட்டாரம்',
        preferedSchool: 'பள்ளியின் பெயர்',
        retypePassword: 'கடவுச்சொல்லை மீண்டும் உள்ளிடவும்',
        highestEducation: 'உயர்கல்வித் தகுதி',
        fieldRequired: 'தவறான உள்ளீடு',
        scholarFormTitle: 'நிறுவங்கள் உதவித்தொகை வழங்குவதற்கான பதிவு படிவம்',
        orgName: 'நிறுவனத்தின் பெயர்',
        contactPersonName: 'தெடர்பு கொள்ள வேண்டிய நபர்',
        contactPersonDesignation: 'தெடர்பு கொள்ள வேண்டிய நபரின் பதவி',
        orgAddress: 'நிறுவனத்தின் முகவரி',
        scholarshipDetails: 'கல்வித்தகுதி பற்றிய சுருக்கமான குறிப்பு',
        orgDistrict: 'விரும்பும் மாவட்ட விவரம்',
        ableToProvideNoOfStudents:
          'தங்கள் நிறுவனத்தால் எத்தனை மாணவர்களுக்குக் கல்வி உதவித்தொகை வழங்க இயலும்',
        orgEligibility: 'கல்வி உதவித் தொகைக்கான தகுதிகள்',
        applicationDeadline: 'விண்ணப்பிக்க கடைசி நாள்',
        applyNow: 'மேலும் பார்க்க',
        district: 'மாவட்டம்',
        thankyou: 'நன்றி',
        modalSuccessMessage: 'You will be contacted in 2 weeks',
        sponsorFormTilte: 'உதவித்தொகை வழங்குவதற்கான பதிவுப் படிவம்',
        pancardName: 'முழுப்பெயர்',
        amount: 'தொகை( Rs.XXXX ஒரு மாணவருக்கான உதவித்தொகை)',
        nationality: 'நாட்டினம்',
        country: 'நாடு',
        anyDistrict: 'Any District',
        taxCertificate: 'வரிவிலக்கு ரசீது தேவையா?',
        sponsorPerticularSchool:
          'ஏதேனும் ஒரு குறிப்பிட்ட  பள்ளியிலுள்ள மாணவர்/மாணவர்களுக்கு உதவ விரும்புகிறீர்களா?',
        sponsorPerticularDistrict:
          'ஏதேனும் ஒரு குறிப்பிட்ட  மாவட்டத்திலுள்ள மாணவர்/மாணவர்களுக்கு உதவ விரும்புகிறீர்களா?',
        btnContribute: 'சமர்ப்பி',
        readMore: 'மேலும் படிக்க',
        //Education loans
        loan: 'கல்விக் கடன்',
        vlPortal: 'வித்யா லட்சுமி இணைய ',
        loanHead:
          'முகப்பு என்பது மாணவர்கள் ஒற்றைச் சாளர முறையில் எளிதாக கல்விக் கடன் பெற ஒன்றிய அரசால் உருவாக்கப்பட்டதாகும். இந்த இணைய முகப்பின் வாயிலாக இந்தியாவில் உள்ள எந்த வங்கியிலும் மூன்று படிநிலைகளில் கல்விக்கடன் பெற விண்ணப்பிக்க இயலும்.',
        howToApply: 'விண்ணப்பம் செய்வது எவ்வாறு?',
        step: 'படிநிலை',
        step1: 'இணைய முகப்பில் பதிவு செய்து உள்நுழையவும்.',
        step2:
          'தேவையான அனைத்து விவரங்களையும் பதிவு செய்து விண்ணப்பப்   படிவத்தை பூர்த்தி செய்தல்.',
        step3: 'தேவை மற்றும் தகுதிக்கு ஏற்ப வங்கிகளுக்கு விண்ணப்பித்தல்.',
        keepInMind: 'நினைவில் கொள்க:',
        point1:
          'இணைய முகப்பின் வாயிலாக அதிகபட்சம் மூன்று வங்கிகளுக்கு மட்டும் விண்ணப்பிக்கலாம்.',
        point2:
          'இணைய முகப்பின் வாயிலாகவே உங்கள் கடன் விண்ணப்பத்தைக் கண்காணிக்கலாம்.',
        point3:
          'ஒப்புதல் கிடைக்கப்பெற்றவுடன் விண்ணப்பதாரரின் கல்விக் கடன் வங்கியால் நேரடியாக வழங்கப்படும்.',
        howToRegister: 'பதிவு செய்வது எவ்வாறு?',
        nameText:
          'பத்தாம் வகுப்பு மதிப்பெண் பட்டியலில் உள்ளவாறு அல்லது உங்கள் கடன் விண்ணப்பத்தில் இணைக்கப்பட்டுள்ள மதிப்பெண் பட்டியலில் உள்ளவாறு.',
        mobileText:
          'உங்கள் கடனின் நிலையை அறியக்கூடிய வகையில் சரியான கைபேசி எண்ணை உள்ளிடவும்.',
        emailText:
          'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும். அனைத்து தகவல்களும் இந்த மின்னஞ்சல் முகவரியின் வாயிலாகவே அனுப்ப ப்படும்.',
        btnApplyNow: 'விண்ணப்பிக்க',
        loanName: 'பெயர் ',
        loanMobile: 'கைபேசி எண்',
        loanEmail: 'மின்னஞ்சல் முகவரி',
        back: 'பின்னால் செல்ல',
        // Survey Form

        emis: 'EMIS எண் ',
        fullName: 'முழு பெயர்',
        studentMedium: 'மாணவரின் பயிற்று மொழி',
        studentMediumHint:
          'சேர்க்கையின் போது வழங்கப்பட்ட தகவலைப் புதுப்பிக்க இந்தத் தரவு சேகரிக்கப்படுகிறது',
        homeLocation: 'உங்கள் வீடு அமைந்துள்ள இடம்',
        homeLocationHint:
          'சேர்க்கையின் போது வழங்கப்பட்ட தகவலைப் புதுப்பிக்க இந்தத் தரவு சேகரிக்கப்படுகிறது',
        homeLocationData: ['மாவட்டம்', 'தாலுகா', 'கிராமம்'],
        fatherOccupation: 'தந்தையின் பணி',
        fatherOccupationHint:
          'சேர்க்கையின் போது வழங்கப்பட்ட தகவலைப் புதுப்பிக்க இந்தத் தரவு சேகரிக்கப்படுகிறது',
        fatherOccupationData: [
          'தினக்கூலி',
          'மாதாந்திர சம்பளம்',
          'சுய வேலை',
          'வேலையில்லை',
          'தந்தை இறந்து விட்டார்',
          'சொல்ல விருப்பம்மில்லை',
        ],
        fatherOccupationDetail:
          'தந்தையின் பணி குறித்த விவரங்களை விளக்கி கூறவும்',
        fatherOccupationDetailData: '',
        fatherEducation: 'தந்தையின் கல்வி தகுதி ',
        fatherEducationHint:
          'சேர்க்கையின் போது வழங்கப்பட்ட தகவலைப் புதுப்பிக்க இந்தத் தரவு சேகரிக்கப்படுகிறது',
        fatherEducationData: [
          '5-ஆம் வகுப்பிற்கு கீழ்',
          '10-வது முடித்தவர்',
          'டிப்ளமோ/ஐடிஐ',
          '12-வது முடித்தவர்',
          'பட்டப்படிப்பு முடித்தவர்',
        ],
        motheOccupationType: 'தாயின் பணி',
        motheOccupationTypeHint:
          'சேர்க்கையின் போது வழங்கப்பட்ட தகவலைப் புதுப்பிக்க இந்தத் தரவு சேகரிக்கப்படுகிறது',
        motheOccupationTypeData: [
          'தினக்கூலி',
          'மாதாந்திர சம்பளம்',
          'சுய வேலை',
          'வேலையில்லை',
          'தாய் இறந்து விட்டார்',
          'சொல்ல விருப்பம்மில்லை',
        ],
        motherOccupationDetails:
          'தாயின் பணி குறித்த விவரங்களை விளக்கி கூறவும் ',
        motherOccupationDetailsData: '',
        motherEducationalQualification: 'தாயின் கல்வி தகுதி ',
        motherEducationalQualificationHint:
          'சேர்க்கையின் போது வழங்கப்பட்ட தகவலைப் புதுப்பிக்க இந்தத் தரவு சேகரிக்கப்படுகிறது',
        motherEducationalQualificationData: [
          '5-ஆம் வகுப்பிற்கு கீழ்',
          '10-வது முடித்தவர்',
          'டிப்ளமோ/ஐடிஐ',
          '12-வது முடித்தவர்',
          'பட்டப்படிப்பு முடித்தவர்',
        ],
        familyAnnualIncome:
          'குடும்ப ஆண்டு வருமானம் / பராமரிப்பாளரிடமிருந்து நிதி ஆதரவு   ',
        familyAnnualIncomeHint:
          'சேர்க்கையின் போது வழங்கப்பட்ட தகவலைப் புதுப்பிக்க இந்தத் தரவு சேகரிக்கப்படுகிறது',
        familyAnnualIncomeData: [
          '0 to 12,000',
          '12,001 - 24,000',
          '24,001 - 50,000',
          '50,001 - 1,00,000',
          '1,00,001 - 2,00,000',
          '2,00, 001 - 3,00,000',
          '3,00,001 - 4,00,000',
          '4,00,001 - 5,00,000',
          '5,00,001 - 6,00,000',
          '6,00,001 - 7,00,000',
          '7,00,001 - 8,00,000',
          '8,00,001 - 10,00,000',
          '10,00,001 - 15,00,000',
          'Greater than 15,00,000',
        ],
        intrestedSubject: 'உங்களுக்கு மிகவும் பிடித்த பாடம் எது?',

        intrestedSubjectData: [
          'தமிழ்',
          'ஆங்கிலம்',
          'இயற்பியல்',
          'வேதியியல்',
          'உயிரியல்',
          'கணினி அறிவியல்',
          'கணிதம்',
          'பொருளாதாரம்',
          'வணிகம்',
          'கணக்கியல்',
          'கணினிப் பயன்பாடு',
          'தாவரவியல்',
          'விலங்கியல்',
          'வரலாறு',
          'வணிகக்கணிதம் & புள்ளியியல்',
          'கணக்கியல் மற்றும் தணிக்கை',
          'வேளாண் அறிவியல்',
          'புள்ளியியல்',
          'புவியியல் ',
          'அலுவலக மேலாண்மை & பணி செயலர்',
          'அடிப்படை மின் பொறியியல்',
          'அடிப்படை இயந்திரவியல் பொறியியல்',
          'ஆடை மற்றும் ஆடை வடிவமைப்பு',
          'அடிப்படை மின்னணு பொறியியல்',
          'உணவு சேவை மேலாண்மை',
          'தகவல்தொடர்பு ஆங்கிலம்',
          'ஆடை  வடிவமைப்புத்தொழில்நுட்பம்',
          'அடிப்படை கட்டடப் பொறியியல்',
          'அடிப்படை ஊர்திப்  பொறியியல்',
          'அரசியல் அறிவியல்',
          'சிறப்புத்தமிழ்',
          'நுண்ணுயிரியல்',
          'மனையியல்',
          'ஊட்டச்சத்து மற்றும் உணவுமுறை',
          'அறவியலும் இந்தியப் பண்பாடும்',
          'உயிர் வேதியியல்',
        ],
        sibilings: 'சொந்த சகோதர சகோதரிகளின் எண்ணிக்கை',
        sibilingsHint:
          'உங்களின் சொந்த சகோதரர்கள் மற்றும் சகோதரிகளின் மொத்த எண்ணிக்கையை உள்ளிடவும்.',
        sibilingsData: '',
        unInrestedSubject: 'உங்களுக்கு மிக குறைவாக பிடித்த பாடம் எது?',
        pursueHigherEducation: 'உயர்கல்வியைத் தொடர விரும்புகிறீர்களா?',
        radioButton: ['ஆம்', 'இல்லை'],
        IntrestedCourse:
          'உயர்கல்வியைத் தொடர்வது விருப்பம் என்றால், எந்தப் படிப்பைப் படிக்க வேண்டும் என்பதில் குழப்பம் உள்ளதா?',
        IntrestedCollege:
          'எந்தப்  படிப்பு எனத் தேர்ந்தெடுத்து இருந்தால் எந்தக் கல்லூரி அல்லது பல்கலைக்கழகத்தில் படிக்க விரும்புகிறீர்கள் என்று உங்களுக்குத் தெரியுமா?',
        worriedAboutSelectedCollege:
          'நீங்கள் விரும்பும் கல்லூரியில் சேர முடியுமோ என்ற கவலை இருக்கிறதா?',
        worriedAboutCollgeFees:
          'கல்லூரியின் கல்விக்கட்டணம் பற்றிக் கவலைப்படுகிறீர்களா ?',
        higherEducationAwayFromHometown:
          'உங்கள் ஊரிலிருந்து வேறு இடத்திற்கு போய் உயர்கல்வியை  தொடர விருப்பம் உள்ளதா ?',
        higherEducationAwayFromHometownData: [
          'சொந்த ஊரை விட்டுப் போவது பற்றிய பதற்றம்',
          'போதுமான தகவல் இல்லாமை',
          'குடும்பத்தின் பொருளாதாரரீதியான தடைகள்',
          'பிற தடைகள்',
          'தடைகள் எதுவும் இல்லை ',
        ],
        challengesInHigherEducation:
          'உங்கள் ஊரிலிருந்து வேறு இடத்திற்கு போய் உயர்கல்வியைத் தொடர்வதில் கீழ்கண்ட சவால்களில் எதை எதிர்கொள்ள நேரிடும் என எண்ணுகிர்கள் ?',
        challengesInHigherEducationData: [
          'சொந்தவூரை விட்டு போவது பற்றி பதட்டம் ',
          'போதுமான தகவல் இல்லாமை',
          'குடும்பத்தில் பொருளாதாரரீதியான தடைகள் ',
          'பிற தடைகள்',
          'தடைகள் எதுவும் இல்லை',
        ],
        specilaztions:
          'எந்தத் துறையில் உங்கள் உயர்கல்வியைத் தொடர விரும்புகிறீர்கள்?',
        specilaztionsHInt:
          'உங்களுக்கு மிகவும் விருப்பமான இரண்டு துறையை தேர்ந்தெடுக்கவும். அனைத்து சிறப்புகளையும் அறிய நான் முதல்வன்  இணையதளத்தை பயன்படுத்தவும் ',
        interestedForStudy: 'படிப்பதற்கு இந்தத்துறையை ஏன் தேர்தெடுத்தீர்கள் ?',
        interestedForStudyData: [
          'இந்தத் துறையில் விருப்பம் ',
          'எனக்குப் பிடித்த/ போற்றுதலுக்கு உரியவர்களால் (idols) கவரப்பட்டு ',
          'நண்பர்கள்/குடும்பத்தினரால் கவரப்பட்டு',
          'நிலைத்த/ அதிக வருமானம் ',
          'பிற',
        ],
        specilaztionsCourses:
          'நீங்கள் தேர்ந்தெடுத்த துறையில் எந்த பாடப்பிரிவுகளில் படிக்கச் விரும்புகிறீர்கள்?',
        specilaztionsCoursesHint:
          'உங்களுக்கு மிகவும் விருப்பமான மூன்று படிப்புகள் வரை தேர்ந்தெடுக்கவும்.  உங்கள் விருப்பத்தைப் புரிந்துகொள்வதே தவிர இந்தப் படிப்பைச் செய்வது கட்டாயமில்லை என்பதை நினைவில் கொள்ளவும்.',
        entranceExamPvt:
          'வரவிருக்கும் கல்வியாண்டில் பின்வரும் நுழைவுத்தேர்வுகளை  எழுத ஆர்வமாக உள்ளீர்களா?',
        entranceExamPvtHint:
          'உங்களுக்கு மிகவும் விருப்பமான மூன்று நுழைவுத் தேர்வுகள் வரை தேர்ந்தெடுக்கவும். நீங்கள் தேர்ந்தெடுத்த சிறப்புப் படிப்புகளுக்கான அனைத்து நுழைவுத் தேர்வுகளையும் அறிய, நான் முதல்வன் இணையதளத்தை பயன்படுத்தவும் ',
        preferJob:
          'கீழ்கண்ட பணிகளில் ஒன்றை தேர்ந்தெடுக்க வேண்டுமென்றால், எதை தேர்ந்தெடுக்க விரும்புகிறீர்கள்?',
        preferJobData: [
          'அரசு வேலை',
          'தனியார் வேலை',
          'சுய தொழில் (சொந்த  வியாபாரம்)',
        ],
        // entranceExamGov: '',
        entranceGovExam:
          'அடுத்த நான்கு ஆண்டுகளில் பின்வரும்  அரசுப்பணிக்கான   தேர்வுகளை எழுத ஆர்வமாக உள்ளீர்களா?',
        entranceGovExamJobsData: [
          'தமிழக அரசு பணியாளர் போட்டி தேர்வுகள் (TNPSC)',
          'ஆசிரியர்களுக்கான போட்டி தேர்வுகள் (TRB)',
          'தமிழ்நாடு சீருடை பணியாளர் போட்டி தேர்வு (TNUSRB i.e Police(SI))',
          'இந்திய அரசு பணியாளர் போட்டி தேர்வுகள் (SSC) Exam',
          'இந்தியக் குடியியல் பணிகள் தேர்வு (UPSC Exam IAS,IPS,IFS etc)',
          'இந்திய ரயில்வே பணியாளர் தேர்வு (RRB Exam)',
          'வங்கி பணிகளுக்கான தேர்வு (IBPS (Banking) Exam)',
          'தேசிய பாதுகாப்பு அகாடமி தேர்வு (NDA (Defence))',
          ' ஒருங்கிணைந்த பாதுகாப்புப் படைத் தேர்வு (CDS (Defence))',
          'ரிசர்வ் வங்கிப் பணியாளர் தேர்வு (RBI Exam)',
          'பொதுத்துறை நிறுவனங்களுக்கான தேர்வு (PSU Exams)',
        ],
        interestedSectors:
          'பின்வரும் எந்தத் துறையில் உங்களுக்கு ஆர்வம் என்று நினைக்கிறீர்கள்?',

        /*
          New Student Survey form on Oct-07
          */

        //Higher Education Interest & Aspirations
        collegeIdea:
          'எந்தப்  படிப்பு எனத் தேர்ந்தெடுத்து இருந்தால் எந்தக் கல்லூரி அல்லது பல்கலைக்கழகத்தில் படிக்க விரும்புகிறீர்கள் என்று உங்களுக்குத் தெரியுமா?',

        higherEducation: 'உயர்கல்வியைத் தொடர விரும்புகிறீர்களா?',
        likeHigherEducation:
          'உயர் கல்வி கற்பது அவசியம் என்று நீங்கள் ஏன் நினைக்கிறீர்கள்?',
        worriedAboutFamily:
          'உங்கள் ஊரிலிருந்து வேறு இடத்திற்குச் சென்று உயர்கல்வியைத் தொடர்வதில் கீழ்க்கண்ட சவால்களில் எதை எதிர்கொள்ள நேரிடும் என எண்ணுகிறீர்கள் ?',
        graduationAwayFromHometown:
          'உங்கள் ஊரிலிருந்து வேறு இடத்திற்குச் சென்றும்  உயர்கல்வியைத்  தொடர விருப்பம் உள்ளதா ?',
        reasonIntrestedCourse:
          'படிப்பதற்கு இந்தத்துறையை ஏன் தேர்ந்தெடுத்தீர்கள் ?',
        jobSector:
          'கீழ்க்கண்ட பணிகளில் ஒன்றைத் தேர்ந்தெடுக்க வேண்டுமென்றால், எதைத் தேர்ந்தெடுக்க விரும்புகிறீர்கள்?',
        sectorInterested:
          'பின்வரும் எத்துறையில்  பணிபுரிய  உங்களுக்கு ஆர்வம் என்று நினைக்கிறீர்கள்?',
          accessedGovtSchemes:'கல்விக்கு நீங்கள் இதுவரை அணுகிய அரசு திட்டங்கள் என்ன?',
          certificates:'உயர்கல்வியைத் தொடர தேவையான சான்றிதழ்கள் உங்களிடம் உள்ளதா?',
          CertificateList:'ஆம் எனில் பட்டியலில் இருந்து தேர்வு செய்யவும்',
          CertificateListData:['எஸ்.எஸ்.எல்.சி', 'மேல்நிலைக் கல்வி', 'பிறப்பு சான்றிதழ்', 'சமூக சான்றிதழ்', 'வருமானச் சான்றிதழ்', 'பரிமாற்றச் சான்றிதழ்', 'மற்றவை'],

        //End

/**
 * New Form
 *
 * **/
 //district:'District',
 eddistrict:'Ed District',
 eradioButton: ['Yes', 'No'],
 ePinCode:'Pin Code',
 //block:'Block',
 eFullName:'Full Name',
 emedium: 'Medium of Instruction',
 eDistrict:'District',
 schoolName:'School Name',
 number:'Phone Number',
 UDISE:'UDISE',
 registerNumber:'RegisterNumber',
 emisNumber:'EMIS Number',
 //fullName:'Full Name'
 contact:'Current Contact Mobile Number',
 whatsappNumber:'Current Contact WhatApp Number',
 alternateNumber:'Alternative Number',
areaLocated:'City/ Town /Village',
takuk:'Block / Taluk',
group:'Group',
mark:'Mark',
pass:'Pass / Fail',
hscPassoutYear:'HSC Passout Year',
appliedCollges:'Have you Applied for any Colleges / Universities',
appliedCollgesData:[
'12th failed',
'Attending Improvement exam',
'Did not attend +2 Exam',
'Doing business',
'Family issues',
'Family not allowing',
'Financial Reasons',
'Own Health issues',
'Family Health Issues',
'Married',
'No near-by colleges',
'Not interested in studying',
'Waiting for counselling',
'Started Working locally (to meet financial need)',
'Others'
],
appiledEntranceExam:'Have you Written any Entrance Exam',
entranceExamData:[
  'Multiple checkbox Dropdown list',
'JEE Mains',
'JEE Advanced',
'All India Law Entrance Test (AILET)',
'Bachelor of Science - Research Program (IIsc)',
'ISI (Indian Statistical Institute)Admission Test',
'NEET(Nationl Eligibility cum Entrance Test) UG',
'BITS Admission Test - BITSAT',
'National Defence Academy & Naval Academy Examination (NDANA)',
'National Institute of Fashion Design (NIFT) - Ability Test ',
'NID Design Aptitude Test – DAT',
'National Aptitude Test in Architecture – NATA',
'CUET/CUCET',
'CLAT',
'Others'
],
counsiling:'Are You Waiting for Counseling',
counsilingData:[
  'Paramedical',
'Engineering',
'Agriculture',
'horticulture',
'Veterinary',
'Fisheries',
'Law',
'JOSAA',
'Neet',
'Others',
],
appliedColleges:'Specific Colleges / Universities / Diploma Courses you have applied',
collgeName:'College(s) Name',
coursesLabel:'Course(s)',
collegeType:'College(s) Type ',
collegeTypeData:[
  'Private College/ University',
'Government College/ University',
'ITI'
],
eadmission:'Have you got admission in any college/ University?',
solutionProvide:'What solution was provided',
solutionProvidedData:[
'Scholarship',
'Bank Loan',
'Skill Development Course',
'Spot admission',
'Family/ Personal Counselling',
'Career and Re-attempt counselling'
],
scholorship:'Scholarship',
sponsor:'Name of Sponsor',
sponsorType:'Type of Sponsor',
sponsorTypeData:[
 ' Dropdown list',
'Individual',
'Corporate',
'NGO'
],
amountLabel:'Amount (in Rs.)',
bankloan:'Bank Loan',
bankName:'Bank Name',
Branch:'Branch',
spotAdmission:'Spot Admission',
collegeName:'College Name',
course:'Course',
collegeTypeLabel:'College Type ',
reattemptCounseling:'Family/ Career Re-attempt Counselling',
suggestion:'Suggestion given',
filledForm:'Who Filled the Form',
nameLabel:'Name',
contactNumber:'Contact Number'

      };
    } else {
      window.document.title = 'Naan Mudhalvan';
      this.language = {
        dob: 'Date of Birth',
        gender: 'Gender',
        firstGraduate: 'First Graduate',
        medium: 'Medium of Instruction',
        disability: 'Person with Disability',
        disabilitypercentage: 'If yes, Percentage',
        community: 'Community',
        trainRoute:
          'Does the student`s hometown/village come under any existing Train Route?',
        nearRailway: 'Nearest major (city/town) Railway station',
        busRoute:
          'Does the student`s hometown/village come under any existing Bus Route?',
        nearBus: 'Nearest major (city/town) Bus stand',

        singleParent: 'Parents',
        parentAlive: 'Parent alive',
        father: 'Father',
        mother: 'Mother',
        fatherPhysical: 'Father',
        motherPhysical: 'Mother',
        gaurdian: 'Gaurdian Name',
        gaurdianRelationship: 'Gaurdian Relationship',
        school: 'School Name',
        hssGroupCode: 'HSS Group code',
        hosteller: 'Ever stayed in hostel during schooling?',
        mediumInstruction:
          'Field to be displayed only if medium of instruction is Tamil',
        govtSchool:
          'Whether students studied in government school from class 1 to class 12?',
        appliedEntranceExam:
          'What are all the applications/Entrance exams applied till now?',
        listAppliedEntranceExam: 'List the other exams applied ',
        jobSector:
          'If you had to choose between working in one of the following, which one would you prefer the most?',
        sectorInterested:
          'Which of the following sectors do you think would be of interest to you? Select all that apply',
        careerGuidance: 'Whether student got any career guidance previously?',
        guide: 'From whom did the student recieve guidance',
        abroadCourse: 'Is the student interested in taking up courses abroad?',
        observationCommentTwo: 'Additional Comments from observer',
        observationCommentOne: 'Additional Comments from observer',
        courseIdea: 'Clear about what course to study?',
        collegeIdea:
          'If you know what course you want to study, do you know in which college or university you would like to study?',
        worriedAboutAdmission:
          'Worried about not getting admission in the college of choice?',
        worriedAboutFees:
          'Are you worried about getting admission in the college of your choice?',
        // graduationAwayFromHometown:
        //   'Any hesitation to pursue graduation away from home town?',
        challengesGraduationAwayFromHometown:
          'Challenges in pursuing graduation away from home town?',
        reasonGraduationAwayFromHometown: 'Your reason',
        IntrestedHigherEducation: 'Field of interest - Higher Education',
        reasonIntrestedCourse: 'Why did you choose to this/ these field(s)?',
        otherReasonIntrestedCourse: 'Other reason',
        IntrestedCourseStudent: 'Interested Courses',
        survey:
          'It is important to know yourself to spread your wings and fly high -reflect and answer these questions',
        embalam: 'Guide to Higher Education & Careers',
        mainSubText: 'For the journey of life',
        screenReader: 'Screen Reader',
        password: 'Password',
        login: 'Login',
        deptSclEdu: 'Department of School Education',
        govtOfTN: 'Government of Tamil Nadu',
        ownedBy:
          'Content of this website is designed, developed, hosted, owned and managed by Department of School Education, Tamil Nadu.',
        username: 'EMIS',
        search: 'search',
        entranceExam: 'Entrance Exam',
        courses: 'Courses',
        educationLoans: 'Education Loans',
        colleges: 'Colleges',
        scholarships: 'Scholarships',
        careers: 'Careers',
        explore: 'Explore',
        viewAll: 'View All',
        examBanner: 'To know your Strengths and Potentials',
        examBanner2: 'Please click here',
        all: 'All',
        filter: 'Filters',
        clearFilter: 'Clear Filter',
        sortBy: 'Sort By',
        countText: 'Students are going for Higher Education.',
        countText2:
          'Choose your Role to fulfil their Dreams and support their Education.',
        makeChoice: 'Make a Choice',
        beMentor: 'Be a Mentor',
        beSponsor: 'Be a Sponsor',
        signup: 'Sign up',
        offerScholarship: 'Offer a Scholarship',
        scholarshipSubtext:
          "Are you an Organisation providing Scholarships to support Student's Higher Education?",
        registerNow: 'Register Now',
        helpline: 'For career counseling,',
        helpline2: 'call Student Helpline Number',
        testimonialsLine1:
          'I started my Class 11 in Government Elite School in 2014. The guidance and encouragement given by the teachers in our school helped my friends and me to focus, work hard and study well. Thanks to their guidance and encouragement, I got admission in Government Medical College, Madurai in 2015',
        testimonialsLine2:
          'I completed my medical studies in 2021. Now, I am working as a Govt Medical Officer at Madurai Government Medical College Hospital at present.',
        testimonialsName1: 'Krishnaveni',
        testimonialsName2:
          'Government Girls Higher Secondary School, Paramkudi',
        aboutVazhikaatti: 'About Naan Mudhalvan',
        aboutVazhikaattiContent:
          'Naan Mudhalvan portal aims to provide dynamic information on Higher Education courses and consequent careers that Class 9-12 students can evaluate and choose to pursue. It includes live up-to-date information on entrance examinations for colleges across the country along with Scholarships or Education loans that students can avail.',
        aboutVazhikaattiContent2:
          'Naan Mudhalvan showcases 2000+ institutes and consequent 300+ career pathways. The portal also contains information of 150+ scholarships for higher education in India.',
        testimonialsHeading: 'Testimonials',
        noOfVisits: 'Number of Visits',
        bannerCareer1:
          'Sivaperuman was too shy to even speak to his classmates.',
        bannerCareer2:
          'His School classes were in English and he took time to adjust.',
        bannerCareer3:
          'He remembers his teachers who would teach well into the night too! He explored and discovered his interest in Space Science.',
        bannerCareer4:
          'Siva looked for higher education options and with the help of guidance from his mentors, joined Aerospace Engineering.',
        forHigherEdu: 'For Higher Education',
        forStudents: 'For the Students',
        beScholarship: 'Be a Scholarship',
        subTextScholarship: 'Providing Partner',
        whatNew: "What's New",
        mentorFormTitle: 'Mentor Registration Form ',
        name: 'Full Name',
        email: 'E-mail',
        mobileNumber: 'Mobile Number',
        address: 'Residential Address',
        pincode: 'Pincode',
        submit: 'Submit',
        reset: 'Reset',
        occupation: 'Occupation',
        interests: 'Interests & Specialization',
        yearsofexp: 'No of years of experience',
        preferedMentorSubtitle: 'Preferred School to be a Mentor',
        state: 'State',
        block: 'Block',
        preferedSchool: 'Preferred School',
        retypePassword: 'Re-type Password',
        highestEducation: 'Highest Education',
        fieldRequired: 'Invalid value',
        // Scholar Form
        scholarFormTitle:
          'Partner with Us to Support Students with Scholarships!',
        orgName: 'Name of the Organization',
        contactPersonName: 'Name of the Contact Person',
        contactPersonDesignation: 'Designation of the Contact Person',
        orgAddress: 'Address of the Organization',
        scholarshipDetails: 'Brief Details about the Scholarship',
        orgDistrict: 'Preferred Geographical Coverage (if any)',
        ableToProvideNoOfStudents:
          'No of Students your organization would be able to provide scholarships?',
        orgEligibility: 'Eligibility Criteria',
        applicationDeadline: 'Application Submission Deadline',
        // Sponsor Form
        sponsorFormTilte:
          'Support A Student to Pursue Higher Education With Confidence',
        pancardName: 'Full Name (As per PAN Card)',
        amount: "Amount ₹ (Sponsor's one child typically)",
        nationality: 'Nationality',
        country: 'Country',
        anyDistrict: 'Any District',
        taxCertificate: 'Tax Exemption Certificate Required?',
        sponsorPerticularSchool:
          'Would you like to Sponsor Student of a particular School?',
        sponsorPerticularDistrict:
          'Would you like to Sponsor Student of a particular District?',
        btnContribute: 'Sponsor Now',
        district: 'District',
        applyNow: 'View more',
        thankyou: 'Thank you',
        modalSuccessMessage: 'You will be contacted in 2 weeks',
        readMore: 'Read more',
        //Education loans
        loan: 'Education Loans',
        vlPortal: 'Vidya Lakshmi Portal,',
        loanHead:
          'is a Single window Education Loan application porrtal developed under the guidance of Government of India to ensure ease of access to the students to avail education loan. The portal allow students to apply for education loans in three steps leading to access to multiple banks across the country.',
        howToApply: 'How to Apply',
        step: 'step',
        step1: 'Register and Login to Vidya Lakshmi portal',
        step2:
          'Fill up the Common Education Loan Application Form (CELAF) by providing all necessary details.',
        step3: 'Apply to banks as per the need & eligibility.',
        keepInMind: 'Keep in mind!',
        point1:
          'You can apply to maximum three banks through Vidya Lakshmi portal.',
        point2:
          'Keep track of your loan application on the Vidya Lakshmi portal Dashboard.',
        point3:
          'Remember, Once approved the education loan of an applicant will be disbursed directly by the bank outside the Vidya Lakshmi Portal.',
        howToRegister: 'How to Register',
        nameText:
          'Enter your full name as per Class 10 class marksheet or as per the mark sheet attached with your loan application',
        mobileText:
          'Enter a valid mobile number where you can get the status of your loan application.',
        emailText:
          'Enter a valid email ID. It will not allowed to change. All necessary communications will be sent on this email ID.',
        btnApplyNow: 'Apply Now',
        loanName: 'Name ',
        loanMobile: 'Mobile Number',
        loanEmail: 'Email ID',
        back: 'Back',

        //survey form english
        emis: 'EMIS Id',
        fullName: 'Full Name',
        studentMedium: 'Medium of the Instruction of the Student',
        studentMediumHint:
          'This data is collected to update the information provided at the time of admission ',
        homeLocation: 'Where is your home? Is it located in ',
        homeLocationHint:
          'This data is collected to update the information provided at the time of admission ',
        homeLocationData: ['District HQ', 'Taluk', 'Village'],

        fatherOccupation: 'Type of Occupation (Father)',
        fatherOccupationHint:
          'This data is collected to update the information provided at the time of admission ',
        fatherOccupationData: [
          'Daily wage labourer',
          'Monthly Salary',
          'Self-employed',
          'Unemployed',
          'Deceased',
          'Unwilling to share',
        ],
        parentData: ['Both Alive', 'Single Parent', 'Both Deceased'],
        parentNames: ['Father', 'Mother'],
        fatherOccupationDetail:
          "Please elaborate to share details about father's Occupation",
        fatherOccupationDetailData: '',
        fatherEducation: 'Educational Qualification (Father)',
        fatherEducationHint:
          'This data is collected to update the information provided at the time of admission ',
        fatherEducationData: [
          'Below 5th',
          'Completed 10th',
          'Completed 12th',
          'Diploma/ITI',
          'Completed Graduation',
          'Completed Post Graduation',
        ],
        motheOccupationType: 'Type of Occupation (Mother)',
        motheOccupationTypeHint:
          'This data is collected to update the information provided at the time of admission ',
        motheOccupationTypeData: [
          'Daily wage labourer',
          'Monthly Salary',
          'Self-employed',
          'Unemployed',
          'Deceased',
          'Unwilling to share',
        ],
        aliveData: ['Alive', ' Not Alive'],
        phisycalData: ['Physically ill', ' Mentally ill', ' Terminal illness'],
        languageData: ['Tamil', 'English'],

        motherOccupationDetails:
          "Please elaborate to share details about mother's Occupation",
        motherOccupationDetailsData: '',
        motherEducationalQualification: 'Educational Qualification (Mother)',
        motherEducationalQualificationHint:
          'This data is collected to update the information provided at the time of admission ',
        motherEducationalQualificationData: [
          'Below 5th',
          'Completed 10th',
          'Diploma/ITI',
          'Completed  12th',
          'Completed Graduation',
        ],
        familyAnnualIncome:
          'Family Annual Income/ Financial Support from Guardian',
        familyAnnualIncomeHint:
          'This data is collected to update the information provided at the time of admission ',
        familyAnnualIncomeData: [
          '0 to 12,000',
          '12,001 - 24,000',
          '24,001 - 50,000',
          '50,001 - 1,00,000',
          '1,00,001 - 2,00,000',
          '2,00, 001 - 3,00,000',
          '3,00,001 - 4,00,000',
          '4,00,001 - 5,00,000',
          '5,00,001 - 6,00,000',
          '6,00,001 - 7,00,000',
          '7,00,001 - 8,00,000',
          '8,00,001 - 10,00,000',
          '10,00,001 - 15,00,000',
          'Greater than 15,00,000',
        ],
        intrestedSubject: 'Which subject do you the like the most?',
        intrestedSubjectData: [
          'Tamil',
          'English',
          'Physics',
          'Chemistry',
          'Biology',
          'Computer Science',
          'Mathematics',
          'Economics',
          'Commerce',
          'Accountancy',
          'Computer Application',
          'Botany',
          'Zoology',
          'History',
          'Business Maths & Statistics',
          'Accountancy And  Auditing',
          'Agricultural Science',
          'Statistics',
          'Geography',
          'Office Management & Secretaryship',
          'Basic Electrical Engineering',
          'Basic Mechanical Engineering',
          'Textiles And Dress Designing',
          'Basic Electronics Engineering',
          'Nursing',
          'Food Service Management',
          'Communication English',
          'Textile Technology',
          'Basic Civil Engineering',
          'Basic Automobile Engineering',
          'Political Science',
          'Advanced Tamizh',
          'Micro Biology',
          'Home Science',
          'Nutrition & Dietetics',
          'Ethics & Indian Culture',
          'Bio-Chemistry',
        ],
        sibilings: 'How many brothers and sisters do you have?',
        sibilingsHint:
          'Please enter the total number of own brothers and/ or sisters you have. ',
        sibilingsData: '',
        unInrestedSubject: 'Which subject do you the like the least?',
        pursueHigherEducation: 'Do you want to pursue higher education?',
        radioButton: ['Yes', 'No'],
        genderData: ['Male', 'Female', 'Transgender'],
        guideData: [
          'Parents',
          'Teachers',
          'Friends',
          'Career Counsellor',
          'Other',
        ],

        IntrestedCourse:
          'If you do want to pursue higher education, do you have confusion about what course to study?',
        IntrestedCollege:
          'If you know what course you want to study, do you know in which college or university you would like to study?',
        worriedAboutSelectedCollege:
          'Are you worried about getting admission in the college of your choice?',
        worriedAboutCollgeFees:
          'Are you worried about high fees in the college of your choice?',
        higherEducationAwayFromHometown:
          'Are you interested to pursue your higher graduation away from your home town ?',
        worriedAboutFamily:
          'Are you worried about your family pressure / situation may create disturbances leads to discontinue from Higher Education ?',
        higherEducationAwayFromHometownData: [
          'Nervousness of leaving home town',
          'Lack of Proper Information',
          'Financial Constraints in family ',
          'Insecurity',
          'Other',
          'No Challenges',
        ],
        challengesInHigherEducation:
          'Please select any of the following reasons if you expect any challenge in pursuing your higher graduation away from your home town?',
        challengesInHigherEducationData: [
          ' Nervousness of leaving home town',
          ' Lack of Proper Information',
          'Financial Constraints in family',
          'Other',
          'No Challenges',
        ],
        appliedEntranceExamData: [
          'JEE',
          'NEET',
          'CLAT',
          'NATA',
          'CUET',
          'NDA',
          'Other',
        ],
        specilaztions:
          'Which field do you want to pursue your higher education?',
        specilaztionsHint:
          'Please select upto two specialisation that interest you the most. Remember to go through Naan Mudhalvan Portal to know all the specialisations. ',
        interestedForStudy: 'Why do you choose to study this field?',
        interestedForStudyData: [
          ' Interest in this field',
          'Inspired by other idols',
          ' Inspired by friends/family',
          ' Stable Income',
          'Others',
        ],
        specilaztionsCourses:
          'Which of the following courses would you like to study in your selected field?',
        specilaztionsCoursesHint:
          'Please select upto three courses that interest you the most. Please note that it is mainly to understand your choice and not mandatory to do this course.',
        entranceExamPvt:
          'Are you interested in writing the following college admission/entrance exams for the upcoming academic year or next?',
        preferJob:
          'If you had to choose between working in one of the following, which one would you prefer the most?',
        preferJobData: [
          'Working in a Government Job',
          'Working in a Private Job',
          'Running my own Business',
          'No preference ',
        ],
        // entranceExamGov: '',
        entranceGovExam:
          'Are you interested in writing the following exams for government jobs in the next four years?',
        entranceGovExamHint:
          'Please select upto three entrance exams that interest you the most. Remember to go through Naan Mudhalvan Portal to know all the entrance exams for your chosen specialisation(s) ',
        entranceGovExamJobsData: [
          'TNPSC Group Exam ',
          'TRB Exam (Teachers)',
          'TNUSRB Exam  (like Police)',
          'Staff Selection Commission Exam',
          ' UPSC Exam',
          'Railways Recruitment Board Exam',
          'IPBS (Banking) Exam',
          'NDA (Defence)',
          'CDS (Defence)',
          'RBI Exam - Reserve Bank of India',
          'PSU Exams ',
        ],

        interestedSectors:
          'Which of the following sectors do you think would be of interest to you? Select all that apply?',

        /*
New student survey form details - dated on oct 07
*/

        emsId: 'EMIS Id',
        studentFullName: 'Full Name',
        //studentMedium:'Medium of the Instruction',
        studentLocation: 'Where is your home? Is it located in',
        //fatherOccupation:'Type of Occupation (Father)',
        //fatherOccupationDetail:"Please elaborate to share details about father's Occupation",
        //fatherEducation:'Educational Qualification (Father)'
        //fatherOccupation:'Type of Occupation (Mother)',
        //fatherOccupationDetail:"Please elaborate to share details about mother's Occupation"
        /*
Aaademic Interest
*/
        /*
Higher Education Interest & Aspirations
*/
        higherEducation: 'Would you like to pursue higher education?',
        likeHigherEducation:
          'If yes, why do you feel it is important to pursue Higher Education?',
        graduationAwayFromHometown:
          'Are you interested / Ready to pursue your higher graduation away from your home town?',
          accessedGovtSchemes:'What are the Govt schemes you have accessed so far in line with Education ',
          certificates:'Do you have the necessary certifiates currently to pursue Higher Education?',
          CertificateList:'if yes choose from the list',
          CertificateListData:['SSLC', 'HSC', 'Birth Certificate', 'Community Certificate', 'Income Certificate', 'Transfer Certificate', 'other'],

        /*
End student survey form
*/

/**
 * New Form
 *
 * **/
 //district:'District',
 eddistrict:'Ed District',
 eDistrict:'District',
 ePinCode:'Pin Code',
 //block:'Block',
 eFullName:'Full Name',
 emedium: 'Medium of Instruction',
 schoolName:'School Name',
 UDISE:'UDISE',
 registerNumber:'RegisterNumber',
 emisNumber:'EMIS Number',
 //fullName:'Full Name'

 contact:'Current Contact Mobile Number',
 whatsappNumber:'Current Contact WhatApp Number',
 alternateNumber:'Alternative Number',
areaLocated:'City/ Town /Village',
takuk:'Block / Taluk',
group:'Group',
mark:'Mark',
pass:'Pass / Fail',
hscPassoutYear:'HSC Passout Year',
appliedCollges:'Have you Applied for any Colleges / Universities',
appliedCollgesData:[
'12th failed',
'Attending Improvement exam',
'Did not attend +2 Exam',
'Doing business',
'Family issues',
'Family not allowing',
'Financial Reasons',
'Own Health issues',
'Family Health Issues',
'Married',
'No near-by colleges',
'Not interested in studying',
'Waiting for counselling',
'Started Working locally (to meet financial need)',
'Others'
],
appiledEntranceExam:'Have you Written any Entrance Exam',
entranceExamData:[
  'Multiple checkbox Dropdown list',
'JEE Mains',
'JEE Advanced',
'All India Law Entrance Test (AILET)',
'Bachelor of Science - Research Program (IIsc)',
'ISI (Indian Statistical Institute)Admission Test',
'NEET(Nationl Eligibility cum Entrance Test) UG',
'BITS Admission Test - BITSAT',
'National Defence Academy & Naval Academy Examination (NDANA)',
'National Institute of Fashion Design (NIFT) - Ability Test ',
'NID Design Aptitude Test – DAT',
'National Aptitude Test in Architecture – NATA',
'CUET/CUCET',
'CLAT',
'Others'
],
counsiling:'Are You Waiting for Counseling',
counsilingData:[
  'Paramedical',
'Engineering',
'Agriculture',
'horticulture',
'Veterinary',
'Fisheries',
'Law',
'JOSAA',
'Neet',
'Others',
],
eradioButton: ['Yes', 'No'],
appliedColleges:'Specific Colleges / Universities / Diploma Courses you have applied',
collegeName:'College(s) Name',
coursesLabel:'Course(s)',
collegeType:'College(s) Type ',
collegeTypeData:[
  'Private College/ University',
'Government College/ University',
'ITI'
],
eadmission:'Have you got admission in any college/ University?',
solutionProvide:'What solution was provided',
solutionProvidedData:[
'Scholarship',
'Bank Loan',
'Skill Development Course',
'Spot admission',
'Family/ Personal Counselling',
'Career and Re-attempt counselling'
],
scholorship:'Scholarship',
sponsor:'Name of Sponsor',
sponsorType:'Type of Sponsor',
sponsorTypeData:[
 ' Dropdown list',
'Individual',
'Corporate',
'NGO'
],
amountLabel:'Amount (in Rs.)',
bankloan:'Bank Loan',
bankName:'Bank Name',
Branch:'Branch',
spotAdmission:'Spot Admission',
course:'Course',
collegeTypeLabel:'College Type ',
reattemptCounseling:'Family/ Career Re-attempt Counselling',
suggestion:'Suggestion given',
filledForm:'Who Filled the Form',
nameLabel:'Name',
contactNumber:'Contact Number',





/**
 * End New Form
 *
 * **/

      };
    }
  }
}
