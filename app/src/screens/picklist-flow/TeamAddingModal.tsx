import {Alert, FlatList, Modal, Pressable, Text, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React from 'react';
import {useTheme} from '@react-navigation/native';

interface TeamAddingModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  teams_list: number[];
  setTeamsList: React.Dispatch<React.SetStateAction<number[]>>;
  possibleTeams: number[];
  addOrRemoveTeam: (team: number) => void;
}
const TeamAddingModal = ({
  visible,
  setVisible,
  teams_list,
  setTeamsList,
  possibleTeams,
  addOrRemoveTeam,
}: TeamAddingModalProps) => {
  const {colors} = useTheme();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onDismiss={() => {
        setVisible(false);
      }}
      onRequestClose={() => {
        setVisible(false);
      }}
      presentationStyle={'pageSheet'}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.card,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              Alert.alert('Would you like to add all teams?', '', [
                {
                  text: 'No',
                  onPress: () => {},
                },
                {
                  text: 'Yes',
                  isPreferred: true,
                  onPress: () => {
                    setTeamsList(possibleTeams);
                    setVisible(false);
                    // setVisible(true);
                  },
                },
              ]);
            }}>
            <Svg
              width="24"
              height="24"
              stroke={
                teams_list.length === possibleTeams.length
                  ? 'gray'
                  : colors.primary
              }
              strokeWidth={1}
              viewBox="0 0 16 16">
              <Path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
              <Path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
            </Svg>
          </Pressable>
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: 'bold',
              marginVertical: '2%',
            }}>
            List of Teams
          </Text>
          <Pressable
            onPress={() => {
              setVisible(false);
            }}>
            <Svg
              width="16"
              height="16"
              fill="gray"
              viewBox="0 0 16 16"
              stroke={'gray'}
              strokeWidth={3}>
              <Path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </Svg>
          </Pressable>
        </View>
        <FlatList
          style={{
            marginTop: '5%',
            marginLeft: '5%',
          }}
          data={
            // filter_by_added
            //   ? possibleTeams.filter(team => teams_list.includes(team))
            possibleTeams
          }
          renderItem={({item}) => {
            return (
              <View
                style={{
                  // backgroundColor: 'red',
                  minWidth: '80%',
                }}>
                <BouncyCheckbox
                  size={30}
                  fillColor="blue"
                  unfillColor="#FFFFFF"
                  text={String(item)}
                  textStyle={{
                    color: colors.text,
                    padding: '2%',
                    fontSize: 20,
                    textDecorationLine: 'none',
                  }}
                  isChecked={teams_list.includes(item)}
                  onPress={() => {
                    addOrRemoveTeam(item);
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default TeamAddingModal;
