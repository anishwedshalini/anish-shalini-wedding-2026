/**
 * Sanskrit shlokas for major sections.
 *
 * Only `status: 'verified'` entries present authentic Devanagari text with
 * scripture name and exact verse numbering. Unverified slots use
 * `status: 'placeholder'` and must never be shown as authentic quotations.
 */
export const shlokas = {
  introduction: {
    id: 'intro-rv-10-85-36',
    status: 'verified',
    sanskrit: 'सुमङ्गलीरियं वधूरिमां समेत पश्यत ।\nसौभाग्यमस्यै दत्त्वायाथास्तं वि परेत ॥',
    meaning:
      'This bride is auspicious; come together and behold her. Having bestowed good fortune upon her, depart to your homes.',
    source: {
      scripture: 'Rigveda',
      reference: '10.85.36',
    },
  },

  kathaMatkor: {
    id: 'event-katha-matkor',
    status: 'placeholder',
    sanskrit: '',
    meaning: '',
    source: {
      scripture: '',
      reference: '',
    },
    placeholderNote:
      'Placeholder: add a verified ceremonial mantra with scripture name and exact verse number.',
  },

  sangeet: {
    id: 'event-sangeet',
    status: 'placeholder',
    sanskrit: '',
    meaning: '',
    source: {
      scripture: '',
      reference: '',
    },
    placeholderNote:
      'Placeholder: add a verified festive blessing mantra with scripture name and exact verse number.',
  },

  haldi: {
    id: 'event-haldi',
    status: 'placeholder',
    sanskrit: '',
    meaning: '',
    source: {
      scripture: '',
      reference: '',
    },
    placeholderNote:
      'Placeholder: add a verified purification / blessing mantra with scripture name and exact verse number.',
  },

  shubhVivaah: {
    id: 'event-vivaah-rv-10-85-42',
    status: 'verified',
    sanskrit: 'इह प्रियं प्रजया ते समृध्यतामस्मिन् गृहे गार्हपत्याय जागृहि ।\nएना पत्या तन्वं सं सृजस्वाधि जीवति शरदः सुवर्चाः ॥',
    meaning:
      'Here may delight in progeny prosper for you; in this house, keep watch for the duties of the household. United in body with this husband, live long through many autumns, radiant in glory.',
    source: {
      scripture: 'Rigveda',
      reference: '10.85.42',
    },
  },

  vidai: {
    id: 'event-vidai-rv-10-85-46',
    status: 'verified',
    sanskrit: 'सम्राज्ञी श्वशुरे भव सम्राज्ञी श्वश्र्वां भव ।\nननान्दरि सम्राज्ञी भव सम्राज्ञी अधि देवृषु ॥',
    meaning:
      'Be a queen to your father-in-law; be a queen to your mother-in-law. Be a queen to your husband’s sister; be a queen over your husband’s brothers.',
    source: {
      scripture: 'Rigveda',
      reference: '10.85.46',
    },
  },

  blessings: {
    id: 'blessings-manu-3-56',
    status: 'verified',
    sanskrit: 'यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः ।\nयत्रैतास्तु न पूज्यन्ते सर्वास्तत्राफलाः क्रियाः ॥',
    meaning:
      'Where women are honoured, there the gods rejoice; where they are not honoured, all rites are fruitless.',
    source: {
      scripture: 'Manusmriti',
      reference: '3.56',
    },
  },

  closing: {
    id: 'closing-vedic-marriage-blessing',
    status: 'verified',
    sanskrit: 'समञ्जन्तु विश्वे देवाः समापो हृदयानि नौ ।\nसं मातरिश्वा सं धाता समुदेष्ट्री दधातु नौ ॥',
    meaning:
      '“May the divine powers unite our hearts as one;\nmay we remain joined together in love and harmony.”',
    source: {
      scripture: 'Rigveda',
      reference: '10.85.47',
      sanskrit: '— ऋग्वेद १०.८५.४७ —',
    },
  },
}
