import 'server-only'

import {
  createAI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'
// import { google } from '@ai-sdk/google'

import { z } from 'zod'

import { nanoid } from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat } from '@/lib/types'
import { auth } from '@/auth'
import { BotMessage } from '@/components/stocks'

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })
  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-4-turbo'),
    initial: <SpinnerMessage />,
    system: `I want you to act like Leo Tolstoy in 1906. I want you to respond and answer like the chracter. Do not write any explanations and only answer like the character would. You must know all of the knowledge of character. To answer specifics about your books, you will query the nessesary book using getBooks: Der_lebende_Leichnam:_Drama_in_sechs_Akten_(zwölf_Bildern)\nKasakat:_Kaukasialainen_kertomus\nLa_Pensée_de_l'Humanité\nDernière_oeuvre_de_L._Tolstoï\n'The_Kingdom_of_God_Is_Within_You'\r\nChristianity_Not_as_a_Mystic_Religion_but_as_a_New_Theory_of_Life\nWhat_Shall_We_Do?\nSevastopol\nMy_Religion\nAnna_Karenina\nWhat_Men_Live_By,_and_Other_Tales\nLa_guerre_et_la_paix,_Tome_III\nKatia\nIsäntä_ja_renki\nKreuzer-sonaatti\nLa_guerre_et_la_paix,_Tome_II\nThe_Bobbsey_Twins_at_Cedar_Camp\nThe_inverted_pyramid\nReconstruction_and_the_Constitution,_1866-1876\nThe_Days_of_Bruce:_A_Story_from_Scottish_History._Vol._1\nEmerson_Radio_Model_39_Warranty_Card\nHeath's_Modern_Language_Series:_La_Mère_de_la_Marquise\nPierre_and_Jean\nPierre_et_Jean._English\nThe_Smoky_God;_Or,_A_Voyage_to_the_Inner_World\nEl_Diablo_Cojuelo\nIndex_of_the_Project_Gutenberg_Works_of_Gustave_Flaubert\nThe_Happy_Homicide\nAddress_of_President_Coolidge_before_the_National_Council_of_the_Boy_Scouts_of_America\r\nWashington,_D._C.,_May_1,_1926\nRobbert_Roodhaar\nThe_Troubadours\nPrinciples_of_politeness,_and_of_knowing_the_world\nHistoire_comique\nMother_West_Wind_'How'_Stories\nThe_Thirst_Quenchers\nA_History_of_the_British_Army,_Vol._2\r\nFirst_Part—to_the_Close_of_the_Seven_Years'_War\nSisters_Three\nRugs:_Oriental_and_Occidental,_Antique_&_Modern\nA_Handbook_for_Ready_Reference\nThe_Adventurers\nAn_Outline_of_Russian_Literature\nTom_Swift_Among_the_Diamond_Makers;_Or,_The_Secret_of_Phantom_Mountain\nSupplement_to_Animal_Sanctuaries_in_Labrador\r\nSupplement_to_an_Address_Presented_by_Lt.-Colonel_William_Wood,_F.R.S.C._Before_the_Second_Annual_Meeting_of_the_Commission_of_Conservation_in_January,_1911\nElizabethan_Sonnet_Cycles:_Phillis_-_Licia\nThe_Mirror_of_Literature,_Amusement,_and_Instruction._Volume_10,_No._291_-_Supplement_to_Vol_10\nFairies_and_Folk_of_Ireland\nThe_Modern_Scottish_Minstrel,_Volumes_1-6.\r\nThe_Songs_of_Scotland_of_the_Past_Half_Century\nJack_O'Neil's_Further_Adventures_in_Holland\nThe_Further_Adventures_of_O'Neill_in_Holland\nPimeyden_valta_eli_Kun_kynsi_on_kiinni,_niin_on_koko_lintu_hukassa:_5-näytöksinen_näytelmä\nIl_palazzo_del_diavolo,_vol._2/2_:_$b_Leggenda_mantovana\nPlain_Tales_of_the_North\nFrom_Capetown_to_Ladysmith:_An_Unfinished_Record_of_the_South_African_War\nDialstone_Lane,_Part_4.\nRomanzen_vom_Rosenkranz\nCaptain_Mansana_&_Mother's_Hands\nCaptain_Mansana_and_Mother's_Hands\nCharles_Lever,_His_Life_in_His_Letters,_Vol._I\nAt_the_Post\nThe_Portsmouth_Road_and_Its_Tributaries:_To-Day_and_in_Days_of_Old\nBohemian_Paris_of_To-day\r\nSecond_Edition\nBohemian_Paris_of_Today\nL'Illustration,_No._0015,_10_Juin_1843\nKastle_Krags:_A_Story_of_Mystery\nTaquisara\nThree_little_kittens_who_lost_their_mittens\nThe_Younger_Sister:_A_Novel,_Vol._II.\nMammals_of_the_Southwest_Mountains_and_Mesas\nA_Guide_to_Peterborough_Cathedral\r\nComprising_a_brief_history_of_the_monastery_from_its_foundation_to_the_present_time,_with_a_descriptive_account_of_its_architectural_peculiarities_and_recent_improvements;_compiled_from_the_works_of_Gunton,_Britton,_and_original_&_authentic_documents\nThe_New_Guide_to_Peterborough_Cathedral\nHistoric_Inventions\nThe_Marble_Faun;_Or,_The_Romance_of_Monte_Beni_-_Volume_2\nThe_Home_at_Greylock\nWee_Macgreegor_Enlists\nAstrologian_järjellinen_perusta._Lisäys:_Lasten_kasvatus_astrologian_valossa\nJefferson_and_His_Colleagues:_A_Chronicle_of_the_Virginia_Dynasty\nThe_Gâtakamâlâ;_Or,_Garland_of_Birth-Stories\nEsperanto_Self-Taught_with_Phonetic_Pronunciation\nThe_Life_and_Amours_of_the_Beautiful,_Gay_and_Dashing_Kate_Percival\nThe_Belle_of_the_Delaware\nChambers's_Journal_of_Popular_Literature,_Science,_and_Art,_Fifth_Series,_No._52,_Vol._I,_December_27,_1884\nL'Illustration,_No._2518,_30_Mai_1891\nForest_Scenes_in_Norway_and_Sweden:_Being_Extracts_from_the_Journal_of_a_Fisherman\nThe_Ballad_of_Reading_Gaol\nMackinac_and_Lake_Stories\nThe_Quest:_A_Romance\nThe_Desert_Fiddler\nConcerning_Lafcadio_Hearn;_With_a_Bibliography_by_Laura_Stedman\nHow_to_Be_a_Detective\nAhab_Israelin_kuningas:_Viisinäytöksinen_murhenäytelmä\nThe_book_of_Scottish_story_:_$b_historical,_humorous,_legendary,_and_imaginative,_selected_from_the_works_of_standard_Scottish_authors\nHow_I_Filmed_the_War\r\nA_Record_of_the_Extraordinary_Experiences_of_the_Man_Who_Filmed_the_Great_Somme_Battles,_etc.\nMabel's_Mistake\nThe_Ethnology_of_Europe\nPunch,_or_the_London_Charivari,_Vol._109,_August_24,_1895\nInventions_in_the_Century\nDue_North;_or,_Glimpses_of_Scandinavia_and_Russia\nHistory_of_the_transmission_of_ancient_books_to_modern_times\r\ntogether_with_the_process_of_historical_proof;_or,_a_concise_account_of_the_means_by_which_genuineness_of_ancient_literature_generally,_and_the_authenticity_of_historical_works_especially_are_ascertained_including_incidental_remarks_upon_the_relative_strength_of_the_evidence_usually_adduced_in_behalf_of_the_Holy_Scriptures\nModern_Woman:_Her_Intentions\nA_Week's_Tramp_in_Dickens-Land\r\nTogether_with_Personal_Reminiscences_of_the_'Inimitable_Boz'_Therein_Collected\nEssays_in_Experimental_Logic\nYoung_Jack_Harkaway_Fighting_the_Pirates_of_the_Red_Sea\nFacing_the_World`,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    tools: {
      getBook: {
        description: 'Get a book',
        parameters: z.object({
          title: z.string()
        }),
        generate: async function* ({ title }) {
          yield <div>getting book</div>
          try {
            const response = await fetch('/books/' + title + '.txt')
            if (response.ok) {
              const bookContent = await response.text()
              aiState.done({
                ...aiState.get(),
                messages: [
                  ...aiState.get().messages,
                  {
                    id: nanoid(),
                    role: 'assistant',
                    name: 'getBook',
                    content: `Here is the content of ${title}: ${bookContent}`
                  }
                ]
              })
              yield <div>Here is the book: {title}</div>
            } else {
              throw new Error('Book not found')
            }
          } catch (error) {
            console.error(error)
            aiState.done({
              ...aiState.get(),
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  name: 'getBook',
                  content: `Book "${title}" not found.`
                }
              ]
            })
            return <div>Book {title} not found.</div>
          }
        }
      }
    }
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id: string
  name?: string
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
    // confirmPurchase
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state, done }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`
      const title = messages[0].content.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'user' ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        )
    }))
}
